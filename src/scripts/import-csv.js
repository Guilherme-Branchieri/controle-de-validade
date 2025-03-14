import pkg from 'csv-parser';
import fs from 'node:fs';
import path from 'node:path';
import { prisma } from '../lib/prisma.js';

export const seedDatabase = async () => {
    const parse = pkg
    const filePath = path.resolve('/root/controle-de-validade/src/data/pg-data.csv');
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.resolve(filePath))
            .pipe(parse({ columns: true, trim: true }))
            .on('data', async (row) => {
                console.log(`Adicionando: ${row}`);

                let vencimentos = row.vencimentos ? row.vencimentos.split(',').map(date => new Date(date.trim())) : [];
                await prisma.produto.createMany({
                    data: {
                        nome: row.nome,
                        vencimentos: vencimentos
                    }
                })
            })
            .on('end', () => {
                console.log('CSV file successfully processed.');
                resolve()
            })
            .on('error', (error) => reject(error));
    });
};

