-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_category_id_fkey";

-- DropIndex
DROP INDEX "Blog_category_id_key";

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("category_id") ON DELETE SET NULL ON UPDATE CASCADE;
