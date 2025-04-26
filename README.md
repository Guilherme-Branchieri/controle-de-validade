
# Controle de Validade de Produtos

Este é um aplicativo web simples para **controle de validade de produtos**, desenvolvido para **promotores de venda** da rede **Zaffari Bourbon**.  
O objetivo é facilitar o monitoramento das datas de vencimento, garantindo que os produtos sejam renovados ou retirados a tempo.

## ✨ Funcionalidades

- Cadastro de produtos com data de validade.
- Painel de visualização para acompanhamento dos vencimentos.
- **Notificações automáticas via email** quando faltam **3 dias** para o vencimento.
- **Exportação** de dados para **CSV**.
- **Importação** de dados a partir de arquivos **CSV**.
- Endpoints dedicados:
  - `GET /export-data` → Exporta todos os produtos em formato CSV.
  - `POST /import-data` → Importa produtos a partir de um arquivo CSV.

## 🚀 Tecnologias Utilizadas

- **Frontend:** EJS, HTML e CSS
- **Backend:** Node.js + Express
- **ORM:** Prisma
- **Banco de Dados:** PostgreSQL
- **Serviços de Email:** MailerSend

## 📦 Instalação

Clone o repositório:

```bash
git clone https://github.com/Guilherme-Branchieri/controle-de-validade.git
cd controle-de-validade
```

Instale as dependências:

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

Configure as variáveis de ambiente (arquivo `.env.example`):

Execute as migrations do Prisma:

```bash
npx prisma migrate deploy
```

Inicie o projeto:

```bash
npm run dev
# ou
yarn dev
```

Acesse no navegador:  
[http://localhost:3000](http://localhost:3000)

## 🔔 Funcionamento do Alerta de Vencimento

- O sistema realiza uma verificação diária dos produtos cadastrados.
- Quando faltar **3 dias** para o vencimento de um produto, um **email de lembrete** é enviado automaticamente ao usuário responsável.

## 📄 Endpoints Especiais

- `GET /export-data`  
  Exporta todos os produtos cadastrados para um arquivo **CSV**.

- `POST /import-data`  
  Permite importar um arquivo **CSV** com novos produtos para o sistema.

## 🛠 Melhorias Futuras

- Upload em lote diretamente pelo painel web.
- Filtros e buscas avançadas no painel de produtos.
- Dashboard de estatísticas de vencimentos.
- Sistema de login e permissões para promotores.

## 🤝 Contribuição

Contribuições são muito bem-vindas!  
Sinta-se à vontade para abrir **issues** ou enviar **pull requests**.

## 📄 Licença

Este projeto está sob a licença [APACHE](LICENSE).
