/*
  Warnings:

  - A unique constraint covering the columns `[id,belongsToId]` on the table `ProteinAmount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProteinAmount_id_belongsToId_key" ON "ProteinAmount"("id", "belongsToId");
