ALTER TYPE "template_type" ADD VALUE 'MODERN';--> statement-breakpoint
ALTER TABLE "portfolio_builder_social_link" RENAME COLUMN "name" TO "title";--> statement-breakpoint
ALTER TABLE "portfolio_builder_social_link" RENAME COLUMN "src" TO "url";--> statement-breakpoint
ALTER TABLE "portfolio_builder_image" RENAME COLUMN "src" TO "url";--> statement-breakpoint
DROP INDEX IF EXISTS "name_idx";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "title_idx" ON "portfolio_builder_social_link" ("title");