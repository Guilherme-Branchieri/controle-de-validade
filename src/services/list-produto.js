import { listProduto } from "../api/produto/list.js";

export async function ListProdutoService(data) {
    const produtos = await listProduto()

    if (!produtos) {
        return new Error("Erro ao buscar produtos")
    }
    return produtos
}