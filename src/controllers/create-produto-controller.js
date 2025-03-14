import { CreateProdutoService } from "../services/create-produto.js";

export async function CreateProdutoController(req, res) {
  try {
    const produto = {
      nome: req.body.nome,
      lote: req.body.lote || "",
      vencimentos: req.body.vencimentos || []
    };

    const createdProduto = await CreateProdutoService(produto);

    res.status(201).json({
      success: true,
      data: createdProduto
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erro ao criar produto',
      error: error.message
    });
  }
}