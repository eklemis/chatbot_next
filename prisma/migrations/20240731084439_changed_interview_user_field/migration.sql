/*
  Warnings:

  - You are about to drop the column `userName` on the `InterviewSummary` table. All the data in the column will be lost.
  - Added the required column `userId` to the `InterviewSummary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InterviewSummary" DROP COLUMN "userName",
ADD COLUMN     "userId" TEXT NOT NULL;
