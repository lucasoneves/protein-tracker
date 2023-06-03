-- AlterTable
ALTER TABLE "ProteinAmount" ALTER COLUMN "target" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passwordResetAt" TIMESTAMP(3),
ADD COLUMN     "passwordResetToken" TEXT;
