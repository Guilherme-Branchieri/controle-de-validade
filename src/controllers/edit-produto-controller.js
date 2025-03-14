import { EditProdutoService } from "../services/edit-produto.js";

export async function EditProdutoController(req, res) {
    try {

        const id = req.params.id
        const { nome, lote, vencimentos } = req.body;

        // Ensure ID is properly parsed as an integer
        const produto = {
            id: parseInt(id),
            nome,
            lote,
            vencimentos
        };


        // Call the service
        const updatedProduto = await EditProdutoService({ id, nome, lote, vencimentos });
        console.log(updatedProduto);

        res.status(200).json({
            success: true,
            updatedProduto
        });

    } catch (error) {
        console.error("Erro no controller:", error.message);
        res.status(400).json({
            success: false,
            message: "Erro ao atualizar produto",
            error: error.message
        });
    }
}
