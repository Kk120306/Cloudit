-- DropForeignKey
ALTER TABLE "shareLink" DROP CONSTRAINT "shareLink_folderId_fkey";

-- AlterTable
ALTER TABLE "shareLink" ALTER COLUMN "folderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "shareLink" ADD CONSTRAINT "shareLink_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
