/*
  Warnings:

  - You are about to drop the `ProteinDailyTarget` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProteinDailyTarget" DROP CONSTRAINT "ProteinDailyTarget_belongsToId_fkey";

-- DropTable
DROP TABLE "ProteinDailyTarget";

-- CreateTable
CREATE TABLE "ProteinDaily" (
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "belongsToId" VARCHAR(255) NOT NULL,

    CONSTRAINT "ProteinDaily_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProteinDaily_id_belongsToId_key" ON "ProteinDaily"("id", "belongsToId");

-- AddForeignKey
ALTER TABLE "ProteinDaily" ADD CONSTRAINT "ProteinDaily_belongsToId_fkey" FOREIGN KEY ("belongsToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
