-- AlterTable
ALTER TABLE "ProteinAmount" ALTER COLUMN "quantity" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passwordResetAt" TIMESTAMP(3),
ADD COLUMN     "passwordResetToken" TEXT,
ADD COLUMN     "provider" TEXT;
