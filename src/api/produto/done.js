import { prisma } from "../../lib/prisma.js";

export async function doneProduto({ id, date }) {

    try {
        // 1. Encontrar o produto
        const produto = await prisma.produto.findUnique({
            where: { id: id }
        });

        if (!produto) {
            throw new Error("Produto não encontrado");
        }

        // 2. Filtrar a data a ser removida
        const updatedDates = produto.vencimentos.filter(d => {
            // Converter para timestamps para comparação segura                         
            const produtoDate = new Date(d).toISOString();
            const targetDate = new Date(date).toISOString();
            console.log(targetDate);

            return produtoDate !== targetDate;
        });

        // 3. Atualizar o produto com as novas datas
        const updatedProduto = await prisma.produto.update({
            where: { id: id },
            data: {
                vencimentos: {
                    set: updatedDates
                }
            }
        });
        console.log(updatedProduto);

        return updatedProduto;

    } catch (error) {
        console.error("Erro no service:", error);
        throw new Error("Falha ao atualizar produto: " + error.message);
    }
}