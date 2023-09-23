/*
  Warnings:

  - Added the required column `telegramUid` to the `Viewer` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Viewer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "telegramUid" INTEGER NOT NULL,
    "registrationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" TEXT NOT NULL DEFAULT 'DEFAULT'
);
INSERT INTO "new_Viewer" ("id", "registrationDate", "role") SELECT "id", "registrationDate", "role" FROM "Viewer";
DROP TABLE "Viewer";
ALTER TABLE "new_Viewer" RENAME TO "Viewer";
CREATE UNIQUE INDEX "Viewer_telegramUid_key" ON "Viewer"("telegramUid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
