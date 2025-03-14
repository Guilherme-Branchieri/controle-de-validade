// services/create-produto.js
import { createProduto } from "../api/produto/create.js"; // ✅ Don't forget .js here too!

export async function CreateProdutoService(data) {
    const invalidDates = data.vencimentos.filter(date => {
        const d = new Date(date);
        return isNaN(d.getTime());
    });

    if (invalidDates.length > 0) {
        throw new Error(`Datas inválidas: ${invalidDates.join(', ')}`);
    }

    try {
        const produto = await createProduto(data);
        console.log(produto);

        return produto;
    } catch (error) {
        throw new Error("Erro ao criar produto");
    }
}