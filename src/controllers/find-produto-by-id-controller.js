import { FindProdutoService } from "../services/find-produto-by-id.js";

export async function FindProdutoController(req, res) {
    try {
        const { id } = req.body.id
        console.log(`Body controller: ${JSON.stringify(req.body)}`);
        const findProduto = await FindProdutoService(id)
        return res.status(201).json({
            success: true,
            produto: findProduto
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Erro ao criar produto',
            error: error.message
        });
    }
}