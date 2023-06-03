/*
  Warnings:

  - You are about to drop the column `target` on the `ProteinAmount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProteinAmount" DROP COLUMN "target";

-- CreateTable
CREATE TABLE "ProteinTarget" (
    "id" TEXT NOT NULL,
    "target" DOUBLE PRECISION,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "belongToId" VARCHAR(255) NOT NULL,

    CONSTRAINT "ProteinTarget_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProteinTarget" ADD CONSTRAINT "ProteinTarget_belongToId_fkey" FOREIGN KEY ("belongToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
