import { prisma } from "../../lib/prisma.js";

export async function findProduto(id) {
    try {
        const produto = await prisma.produto.findUnique({
            where: { id: id }
        });

        if (!produto) {
            throw new Error("Produto não encontrado");
        }


        return produto;

    } catch (error) {
        throw new Error("Falha ao buscar produto: " + error.message);
    }
}