import { ListProdutoService } from "../services/list-produto.js";

export async function ListProdutoController(req, res) {
    try {
        const produtos = await ListProdutoService();

        // Sort products by closest expiration
        const sortedProdutos = produtos.sort((a, b) => {
            const closestA = a.closestExpiration?.getTime() || Infinity;
            const closestB = b.closestExpiration?.getTime() || Infinity;
            return closestA - closestB;
        });
        

        res.render('list-produtos', {
            title: 'Produtos por Vencimento',
            produtos: sortedProdutos
        });

    } catch (error) {
        res.status(500).render('error', {
            title: 'Erro',
            message: 'Erro ao carregar produtos'
        });
    }
}