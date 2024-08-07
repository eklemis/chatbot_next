/*
  Warnings:

  - Added the required column `title` to the `InterviewSummary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InterviewSummary" ADD COLUMN     "title" TEXT NOT NULL;
