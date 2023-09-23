/*
  Warnings:

  - You are about to alter the column `telegramUid` on the `Viewer` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Viewer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "telegramUid" BIGINT NOT NULL,
    "registrationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" TEXT NOT NULL DEFAULT 'DEFAULT'
);
INSERT INTO "new_Viewer" ("id", "registrationDate", "role", "telegramUid") SELECT "id", "registrationDate", "role", "telegramUid" FROM "Viewer";
DROP TABLE "Viewer";
ALTER TABLE "new_Viewer" RENAME TO "Viewer";
CREATE UNIQUE INDEX "Viewer_telegramUid_key" ON "Viewer"("telegramUid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
