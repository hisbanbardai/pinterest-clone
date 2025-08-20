/*
  Warnings:

  - You are about to drop the column `boardId` on the `Pins` table. All the data in the column will be lost.
  - You are about to drop the `Boards` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Boards" DROP CONSTRAINT "Boards_userId_fkey";

-- DropForeignKey
ALTER TABLE "Pins" DROP CONSTRAINT "Pins_boardId_fkey";

-- AlterTable
ALTER TABLE "Pins" DROP COLUMN "boardId";

-- DropTable
DROP TABLE "Boards";

-- CreateTable
CREATE TABLE "User_Saved_Pins" (
    "userId" TEXT NOT NULL,
    "pinId" TEXT NOT NULL,

    CONSTRAINT "User_Saved_Pins_pkey" PRIMARY KEY ("userId","pinId")
);

-- AddForeignKey
ALTER TABLE "User_Saved_Pins" ADD CONSTRAINT "User_Saved_Pins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Saved_Pins" ADD CONSTRAINT "User_Saved_Pins_pinId_fkey" FOREIGN KEY ("pinId") REFERENCES "Pins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
