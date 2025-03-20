-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/dj1gixl83/image/upload/f_auto,q_auto/v1/Decor%20app/ngega9bwqnhvyot6twux',
    "price" DECIMAL NOT NULL,
    "description" TEXT NOT NULL,
    "subCategoryId" INTEGER NOT NULL,
    "cartId" INTEGER,
    "wishlistId" INTEGER,
    CONSTRAINT "Product_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Product_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Product_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "Wishlist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("cartId", "description", "id", "image", "name", "price", "subCategoryId", "wishlistId") SELECT "cartId", "description", "id", "image", "name", "price", "subCategoryId", "wishlistId" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE TABLE "new_Rate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    CONSTRAINT "Rate_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Rate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Rate" ("id", "productId", "rating", "userId") SELECT "id", "productId", "rating", "userId" FROM "Rate";
DROP TABLE "Rate";
ALTER TABLE "new_Rate" RENAME TO "Rate";
CREATE UNIQUE INDEX "Rate_productId_key" ON "Rate"("productId");
CREATE UNIQUE INDEX "Rate_userId_key" ON "Rate"("userId");
CREATE TABLE "new_SubCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "SubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SubCategory" ("categoryId", "id", "name") SELECT "categoryId", "id", "name" FROM "SubCategory";
DROP TABLE "SubCategory";
ALTER TABLE "new_SubCategory" RENAME TO "SubCategory";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "password" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/dj1gixl83/image/upload/f_auto,q_auto/v1/Decor%20app/z3hzx5jfzeecuzx3uokj',
    "cartId" INTEGER,
    "wishlistId" INTEGER,
    CONSTRAINT "User_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "User_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "Wishlist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_User" ("birthDate", "cartId", "email", "gender", "id", "image", "name", "password", "phone", "wishlistId") SELECT "birthDate", "cartId", "email", "gender", "id", "image", "name", "password", "phone", "wishlistId" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
