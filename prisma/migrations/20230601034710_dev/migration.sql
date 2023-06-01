/*
  Warnings:

  - You are about to drop the column `quantity` on the `ProteinDaily` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProteinDaily" DROP COLUMN "quantity",
ADD COLUMN     "amount" DOUBLE PRECISION;
