/*
  Warnings:

  - You are about to drop the column `vence_em` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `vencimentos_anteriores` on the `produtos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "vence_em",
DROP COLUMN "vencimentos_anteriores",
ADD COLUMN     "vencimentos" TIMESTAMP(3)[];
