import { prisma } from "../../lib/prisma.js";

export async function deleteProduto(id) {

    try {
        const produto = await prisma.produto.delete({
            where: {
                id: parseInt(id)
            }
        })
        console.log(produto)

    } catch (error) {
        console.error("Erro no service:", error);
        throw new Error("Falha ao criar produto: " + error.message);
    }
}