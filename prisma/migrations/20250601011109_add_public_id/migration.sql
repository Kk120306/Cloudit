-- CreateTable
CREATE TABLE "shareLink" (
    "id" TEXT NOT NULL,
    "folderId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shareLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "shareLink" ADD CONSTRAINT "shareLink_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
