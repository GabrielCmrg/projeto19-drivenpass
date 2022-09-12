-- CreateEnum
CREATE TYPE "Type" AS ENUM ('credit', 'debit', 'both');

-- CreateTable
CREATE TABLE "cards" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "printedName" TEXT NOT NULL,
    "securityCode" INTEGER NOT NULL,
    "expiresAt" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isVirtual" BOOLEAN NOT NULL,
    "type" "Type" NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cards_title_ownerId_key" ON "cards"("title", "ownerId");

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
