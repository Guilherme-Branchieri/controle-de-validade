// services/create-produto.js

import { findProduto } from "../api/produto/find-by-id.js";

export async function FindProdutoService(id) {
    try {
        const produto = await findProduto(parseInt(id));
        return produto
    } catch (error) {
        console.log('erro aqui');
        
        throw new Error("Erro ao criar produto");
    }
}