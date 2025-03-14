// services/list-produto-service.js
import { prisma } from "../../lib/prisma.js";

export async function listProduto() {
    const produtos = await prisma.produto.findMany();

    return produtos.map(produto => ({
        ...produto,
        closestExpiration: getClosestExpiration(produto.vencimentos)
    }));
}

// Helper function to find closest expiration date
function getClosestExpiration(vencimentos) {
    if (!vencimentos || vencimentos.length === 0) return null;

    const now = new Date();
    const validDates = vencimentos
        .map(dateStr => new Date(dateStr))
        .filter(date => !isNaN(date.getTime()));

    if (validDates.length === 0) return null;

    // Encontra a data futura mais próxima
    const futureDates = validDates.filter(d => d > now);
    return futureDates.length > 0
        ? new Date(Math.min(...futureDates.map(d => d.getTime())))
        : null;
}
// function getClosestExpiration(vencimentos) {
//     // ... validações iniciais
//     if (!vencimentos || vencimentos.length === 0) return null;

//     const now = new Date();
//     const validDates = vencimentos.map(dateStr => {
//         // Forçar interpretação como UTC
//         const [year, month, day] = dateStr.split('T')[0].split('-');
//         return new Date(Date.UTC(year, month - 1, day));
//     }).filter(date => !isNaN(date.getTime()));

//     const futureDates = validDates.filter(d => d > now);

//     // Se houver datas futuras, pega a mais próxima
//     if (futureDates.length > 0) {
//         return new Date(Math.min(...futureDates.map(d => d.getTime())));
//     }

//     // Se não houver futuras, pega a passada mais recente
//     return new Date(Math.max(...validDates.map(d => d.getTime())));
// }