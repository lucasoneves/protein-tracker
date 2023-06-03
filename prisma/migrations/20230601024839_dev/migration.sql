/*
  Warnings:

  - You are about to drop the column `passwordResetAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passwordResetToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "passwordResetAt",
DROP COLUMN "passwordResetToken",
DROP COLUMN "provider";
