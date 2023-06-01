/*
  Warnings:

  - You are about to drop the column `passwordResetAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passwordResetToken` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProteinTarget" DROP CONSTRAINT "ProteinTarget_belongToId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "passwordResetAt",
DROP COLUMN "passwordResetToken";

-- AddForeignKey
ALTER TABLE "ProteinTarget" ADD CONSTRAINT "ProteinTarget_belongToId_fkey" FOREIGN KEY ("belongToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
