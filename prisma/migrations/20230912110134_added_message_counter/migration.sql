/*
  Warnings:

  - You are about to drop the column `messageCount` on the `TwitchLink` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "count" INTEGER NOT NULL,
    "viewerId" INTEGER NOT NULL,
    "twitchLinkId" INTEGER NOT NULL,
    CONSTRAINT "Message_viewerId_fkey" FOREIGN KEY ("viewerId") REFERENCES "Viewer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Message_twitchLinkId_fkey" FOREIGN KEY ("twitchLinkId") REFERENCES "TwitchLink" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TwitchLink" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "twitchId" TEXT NOT NULL,
    "viewerId" INTEGER NOT NULL,
    CONSTRAINT "TwitchLink_viewerId_fkey" FOREIGN KEY ("viewerId") REFERENCES "Viewer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TwitchLink" ("id", "twitchId", "viewerId") SELECT "id", "twitchId", "viewerId" FROM "TwitchLink";
DROP TABLE "TwitchLink";
ALTER TABLE "new_TwitchLink" RENAME TO "TwitchLink";
CREATE UNIQUE INDEX "TwitchLink_twitchId_key" ON "TwitchLink"("twitchId");
CREATE UNIQUE INDEX "TwitchLink_viewerId_key" ON "TwitchLink"("viewerId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
