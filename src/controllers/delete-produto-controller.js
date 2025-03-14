import { DeleteProdutoService } from "../services/delete-produto.js";

export async function DeleteProdutoController(req, res) {
    console.log(req.body);

    try {
        await DeleteProdutoService(req.body.id)
        res.status(200).json({
            success: true,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Erro ao deletar produto',
            error: error.message
        });
    }
}