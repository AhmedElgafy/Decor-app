-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/dj1gixl83/image/upload/f_auto,q_auto/v1/Decor%20app/ngega9bwqnhvyot6twux',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Category" ("id", "name") SELECT "id", "name" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE UNIQUE INDEX "Category_id_key" ON "Category"("id");
CREATE TABLE "new_SubCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/dj1gixl83/image/upload/f_auto,q_auto/v1/Decor%20app/ngega9bwqnhvyot6twux',
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "SubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SubCategory" ("categoryId", "id", "name") SELECT "categoryId", "id", "name" FROM "SubCategory";
DROP TABLE "SubCategory";
ALTER TABLE "new_SubCategory" RENAME TO "SubCategory";
CREATE UNIQUE INDEX "SubCategory_id_key" ON "SubCategory"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
