-- CreateTable
CREATE TABLE "ProteinDailyTarget" (
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "belongsToId" VARCHAR(255) NOT NULL,

    CONSTRAINT "ProteinDailyTarget_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProteinDailyTarget_id_belongsToId_key" ON "ProteinDailyTarget"("id", "belongsToId");

-- AddForeignKey
ALTER TABLE "ProteinDailyTarget" ADD CONSTRAINT "ProteinDailyTarget_belongsToId_fkey" FOREIGN KEY ("belongsToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
