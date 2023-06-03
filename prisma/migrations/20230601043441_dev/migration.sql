-- DropForeignKey
ALTER TABLE "ProteinTarget" DROP CONSTRAINT "ProteinTarget_belongToId_fkey";

-- AddForeignKey
ALTER TABLE "ProteinTarget" ADD CONSTRAINT "ProteinTarget_belongToId_fkey" FOREIGN KEY ("belongToId") REFERENCES "ProteinAmount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
