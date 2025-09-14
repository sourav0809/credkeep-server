/*
  Warnings:

  - You are about to drop the column `field_value_encrypted` on the `credential_fields` table. All the data in the column will be lost.
  - You are about to drop the column `site_name` on the `credentials` table. All the data in the column will be lost.
  - You are about to drop the column `site_url` on the `credentials` table. All the data in the column will be lost.
  - You are about to drop the column `content_encrypted` on the `notes` table. All the data in the column will be lost.
  - Added the required column `field_value` to the `credential_fields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `credentials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `notes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."credential_fields" DROP COLUMN "field_value_encrypted",
ADD COLUMN     "field_value" TEXT NOT NULL,
ALTER COLUMN "field_type" SET DEFAULT 'TEXT';

-- AlterTable
ALTER TABLE "public"."credentials" DROP COLUMN "site_name",
DROP COLUMN "site_url",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'password',
ADD COLUMN     "url" TEXT;

-- AlterTable
ALTER TABLE "public"."notes" DROP COLUMN "content_encrypted",
ADD COLUMN     "content" TEXT NOT NULL;
