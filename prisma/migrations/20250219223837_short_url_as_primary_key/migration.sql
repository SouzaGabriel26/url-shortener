/*
  Warnings:

  - The primary key for the `Urls` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Urls` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Urls" DROP CONSTRAINT "Urls_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Urls_pkey" PRIMARY KEY ("shortUrl");
