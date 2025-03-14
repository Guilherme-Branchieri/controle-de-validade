import { deleteProduto } from "../api/produto/delete.js";

export async function DeleteProdutoService(id) {
    try {
        await deleteProduto(id);
        return
    } catch (error) {
        throw new Error("Erro ao deletar produto");
    }
}