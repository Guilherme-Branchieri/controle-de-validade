-- CreateTable
CREATE TABLE "produtos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "lote" TEXT,
    "vence_em" TIMESTAMP(3) NOT NULL,
    "vencimentos_anteriores" TIMESTAMP(3)[],

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "produtos_nome_key" ON "produtos"("nome");
