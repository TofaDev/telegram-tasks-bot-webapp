-- CreateTable
CREATE TABLE "Viewer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "registrationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" TEXT NOT NULL DEFAULT 'DEFAULT'
);

-- CreateTable
CREATE TABLE "TwitchLink" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "twitchId" TEXT NOT NULL,
    "viewerId" INTEGER NOT NULL,
    "messageCount" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "TwitchLink_viewerId_fkey" FOREIGN KEY ("viewerId") REFERENCES "Viewer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "TwitchLink_twitchId_key" ON "TwitchLink"("twitchId");

-- CreateIndex
CREATE UNIQUE INDEX "TwitchLink_viewerId_key" ON "TwitchLink"("viewerId");
