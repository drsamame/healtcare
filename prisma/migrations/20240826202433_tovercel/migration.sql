/*
  Warnings:

  - You are about to drop the column `primaryPhysician` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `specialty` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Appointment_id_key";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "primaryPhysician",
ADD COLUMN     "specialty" TEXT NOT NULL,
ALTER COLUMN "aditionalInfo" DROP NOT NULL,
ALTER COLUMN "cancellationReason" DROP NOT NULL;

-- DropTable
DROP TABLE "VerificationToken";
