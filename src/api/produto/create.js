import { prisma } from "../../lib/prisma.js";

export async function createProduto(data) {
    try {
        const vencimentosDates = data.vencimentos.map(dateStr => {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) {
                throw new Error(`Data inválida: ${dateStr}`);
            }
            return date;
        });

        const produto = await prisma.produto.create({
            data: {
                nome: data.nome.toLowerString(),
                lote: data.lote || "",
                vencimentos: vencimentosDates
            }
        });

        return produto;

    } catch (error) {
        console.error("Erro no service:", error);
        throw new Error("Falha ao criar produto: " + error.message);
    }
}