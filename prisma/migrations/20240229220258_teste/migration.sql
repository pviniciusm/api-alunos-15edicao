/*
  Warnings:

  - You are about to drop the column `tipo` on the `aluno` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "aluno" DROP COLUMN "tipo";

-- DropEnum
DROP TYPE "TipoAlunoPrisma";
