/*
  Warnings:

  - You are about to drop the column `belongToId` on the `ProteinTarget` table. All the data in the column will be lost.
  - Added the required column `belongsToId` to the `ProteinTarget` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProteinTarget" DROP CONSTRAINT "ProteinTarget_belongToId_fkey";

-- AlterTable
ALTER TABLE "ProteinTarget" DROP COLUMN "belongToId",
ADD COLUMN     "belongsToId" VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE "ProteinTarget" ADD CONSTRAINT "ProteinTarget_belongsToId_fkey" FOREIGN KEY ("belongsToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
