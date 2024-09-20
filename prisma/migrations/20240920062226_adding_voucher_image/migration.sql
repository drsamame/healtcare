/*
  Warnings:

  - You are about to drop the column `agendedDate` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "agendedDate";

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "voucherDocumentUrl" TEXT;
