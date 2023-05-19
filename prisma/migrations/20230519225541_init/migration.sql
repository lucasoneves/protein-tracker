/*
  Warnings:

  - You are about to alter the column `belongsToId` on the `ProteinAmount` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- DropForeignKey
ALTER TABLE "ProteinAmount" DROP CONSTRAINT "ProteinAmount_belongsToId_fkey";

-- AlterTable
ALTER TABLE "ProteinAmount" ALTER COLUMN "belongsToId" SET DATA TYPE VARCHAR(255);

-- AddForeignKey
ALTER TABLE "ProteinAmount" ADD CONSTRAINT "ProteinAmount_belongsToId_fkey" FOREIGN KEY ("belongsToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
