/*
  Warnings:

  - A unique constraint covering the columns `[cellphone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `agendedDate` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "agendedDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "User_cellphone_key" ON "User"("cellphone");
