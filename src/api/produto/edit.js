import { prisma } from "../../lib/prisma.js";

export async function editProduto({ id, nome, lote, vencimentos }) {
    try {
        const produto = await prisma.produto.findUnique({
            where: { id: id },
            select: { vencimentos: true } // Fetch only vencimentos
        });

        if (!produto) {
            throw new Error("Produto não encontrado");
        }

        // Convert existing and new dates to ISO format for accurate comparison
        const existingDates = produto.vencimentos.map(date => new Date(date).toISOString());
        const newDates = vencimentos
            .map(date => new Date(date).toISOString())
            .filter(date => !existingDates.includes(date)); // Only keep new dates

        // Prepare update object
        const updateData = {
            nome: nome ?? undefined,
            lote: lote ?? undefined,
        };

        // Update vencimentos only if there are new ones
        if (newDates.length > 0) {
            updateData.vencimentos = { set: [...existingDates, ...newDates] };
        }

        // Update produto in database
        const updatedProduto = await prisma.produto.update({
            where: { id: id },
            data: updateData
        });

        return updatedProduto;

    } catch (error) {
        console.error("Erro no service:", error);
        throw new Error("Falha ao atualizar produto: " + error.message);
    }
}
