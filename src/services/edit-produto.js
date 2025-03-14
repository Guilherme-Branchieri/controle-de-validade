import { editProduto } from "../api/produto/edit.js";

export async function EditProdutoService({ id, nome, lote, vencimentos }) {
    try {
        const updatedProduto = await editProduto({
            id: parseInt(id) , nome: nome , lote: lote , vencimentos: vencimentos 
        });
        return updatedProduto
    } catch (error) {
        throw new Error("Erro ao criar produto");
    }
}