import { DoneProdutoService } from "../services/done-produto.js";

export async function DoneProdutoController(req, res) {
    try {
        const produto = {
            id: req.body.id,
            date: req.body.date
        };


        const updatedProduto = await DoneProdutoService({ id: parseInt(produto.id), date: produto.date });
        console.log(updatedProduto);


        res.status(201).json({
            success: true,
            updatedProduto: updatedProduto
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Erro ao criar produto',
            error: error.message
        });
    }
}