// services/create-produto.js

import { doneProduto } from "../api/produto/done.js";

export async function DoneProdutoService({ id, date }) {

    try {
        const updatedProduto = await doneProduto({ id, date });
        return updatedProduto
    } catch (error) {
        throw new Error("Erro ao criar produto");
    }
}