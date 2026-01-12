/*
  Warnings:

  - Added the required column `location` to the `trips` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trips" ADD COLUMN     "location" TEXT NOT NULL;
