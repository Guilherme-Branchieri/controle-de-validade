import { createObjectCsvWriter } from 'csv-writer';
import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import path from 'path';
import { fileURLToPath } from 'url';
import { CreateProdutoController } from './controllers/create-produto-controller.js';
import { DeleteProdutoController } from './controllers/delete-produto-controller.js';
import { DoneProdutoController } from './controllers/done-produto-controller.js';
import { ListProdutoController } from './controllers/list-produto-controller.js';
import { prisma } from './lib/prisma.js';
import { SendEmail } from './modules/mailersend.js';
import { appRouter } from './modules/router.js';
import { EditProdutoService } from './services/edit-produto.js';
import { FindProdutoService } from './services/find-produto-by-id.js';
import { ListProdutoService } from './services/list-produto.js';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(expressEjsLayouts)
app.use(express.static('public'));
app.set('layout', path.join(__dirname, 'views/layouts/main'))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


const listProdutoAPIRoute = appRouter("get", '/api/produtos/listar', ListProdutoController)
app.use(listProdutoAPIRoute)

const createProdutoAPIRoute = appRouter("post", "/api/produtos/adicionar", CreateProdutoController);
app.use(createProdutoAPIRoute)

const deleteProdutoAPIRoute = appRouter("delete", "/api/produtos/deletar", DeleteProdutoController)
app.use(deleteProdutoAPIRoute)

const doneProdutoAPIRoute = appRouter("patch", "/api/produtos/done", DoneProdutoController)
app.use(doneProdutoAPIRoute)
// const editProdutoAPIRoute = appRouter('patch', '/api/produtos/editar/:id', EditProdutoController);
// app.use(editProdutoAPIRoute)




app.get('/produtos', async (req, res) => {
    const produtos = await ListProdutoService();
    res.render('todos-produtos', {
        title: 'Lista de Produtos',
        stylesheet: '/css/home.css',
        produtos: produtos,
        now: new Date().no // Passa a data atual para o template
    });

})

app.get('/', async (req, res) => {
    try {
        let needEmail = false
        const produtos = await ListProdutoService();
        const sortedProdutos = produtos
            .filter(p => p.closestExpiration) // Remove itens sem data válida
            .sort((a, b) => a.closestExpiration - b.closestExpiration);
        sortedProdutos.forEach(async produto => {
            const expirationDate = produto.closestExpiration ? new Date(produto.closestExpiration) : null;
            const daysDiff = expirationDate ? Math.ceil((expirationDate - new Date()) / (1000 * 3600 * 24)) : null;
            if (daysDiff < 3) {
                // needEmail = true
                console.log('envia email')
                return
            }
        })

        if (needEmail) {
            await SendEmail("branchieri.contato@gmail.com", "Guilherme Branchieri")
        }

        res.render('home', {
            title: 'Produtos por Vencimento',
            stylesheet: '/css/home.css',
            produtos: sortedProdutos,
            now: new Date().no // Passa a data atual para o template
        });

    } catch (error) {
        console.log(error);
    }

});


// TODO
// app.get('/email', async (req, res) => {
//     try {
//         const produto = await prisma.produto.findUnique({
//             where: {
//                 id: 89
//             }
//         })
//         await SendEmail("branchieri.contato@gmail.com", "Guilherme Branchieri")
//         await SendEmail("estefani.hoffmann02@gmail.com", "Estefani Hoffmann")
//         return res.render('email-validade', {
//             title: 'Lembrete por E-mail',
//             stylesheet: '/css/home.css',
//             produto: produto
//         })

//     } catch (error) {
//         console.log(error);

//     }
// })

app.get("/export-data", async (req, res) => {
    const produtos = await prisma.produto.findMany()
    console.log(produtos);
    const writer = createObjectCsvWriter({
        path: path.resolve('./src/data/app-data.csv'),
        header: [
            { id: 'nome', title: 'nome' },
            { id: 'lote', title: 'lote' },
            { id: 'vencimentos', title: 'vencimentos' },
        ],
    });
    await writer.writeRecords(produtos).then((response) => {
        console.log(response);
        console.log("Done");

    })
})

app.get('/import-data', async (req, res) => {
    try {
        await seedDatabase()
        res.send({ message: "done" })
    } catch (error) {
        console.log(error);

    }
})
app.patch('/api/produtos/editar/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10); // ✅ Fix: Convert id to number
        const { nome, lote, vencimentos } = req.body;

        if (!id) throw new Error("Invalid ID");

        const produto = { id, nome, lote, vencimentos };
        console.log(`Updating product:`, produto);

        const updatedProduto = await EditProdutoService(produto);
        console.log(updatedProduto);

        res.status(200).json({
            success: true,
            updatedProduto
        });

    } catch (error) {
        console.error("Erro no controller:", error.message);
        res.status(400).json({
            success: false,
            message: "Erro ao atualizar produto",
            error: error.message
        });
    }
});
app.get('/produtos/editar/:id', async (req, res) => {
    const produtoId = req.params.id;

    const produto = await FindProdutoService(produtoId);
    console.log(`Controller: ${JSON.stringify(produto)}`);


    res.render('editar-produto', {
        title: 'Editar Produto',
        stylesheet: '/css/adicionar-produto.css',
        produto: produto
    });
});


app.get('/adicionar-produto', async (req, res) => {
    res.render('adicionar-produto', {
        title: 'Adicionar Produto',
        stylesheet: '/css/adicionar-produto.css' // Add this line
    });
})

// Middleware para lidar com erros 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Rota não encontrada'
    });
});

// Middleware para erros gerais
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Erro interno no servidor'
    });
});

app.listen(3000);