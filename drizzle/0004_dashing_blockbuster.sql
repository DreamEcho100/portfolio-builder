ALTER TABLE "portfolio_builder_custom_page" ADD COLUMN "job_title" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "portfolio_builder_social_link" DROP COLUMN IF EXISTS "job_title";