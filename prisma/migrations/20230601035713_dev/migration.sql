/*
  Warnings:

  - You are about to drop the `ProteinDaily` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProteinDaily" DROP CONSTRAINT "ProteinDaily_belongsToId_fkey";

-- DropIndex
DROP INDEX "ProteinAmount_id_belongsToId_key";

-- AlterTable
ALTER TABLE "ProteinAmount" ADD COLUMN     "target" DOUBLE PRECISION;

-- DropTable
DROP TABLE "ProteinDaily";
