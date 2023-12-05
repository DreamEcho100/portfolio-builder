DO $$ BEGIN
 CREATE TYPE "template_type" AS ENUM('BASIC', 'STANDARD');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "type" AS ENUM('LINKEDIN', 'FACEBOOK', 'WEBSITE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portfolio_builder_custom_page" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"slug" varchar(255),
	"full_name" varchar(255),
	"bio" text,
	"profile_image_id" varchar(255),
	"seo_id" varchar(255),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp,
	"template_type" "template_type" DEFAULT 'BASIC'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portfolio_builder_social_link" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"src" varchar(255) NOT NULL,
	"type" "type" DEFAULT 'WEBSITE',
	"custom_page_id" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portfolio_builder_image" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"src" varchar(255) NOT NULL,
	"alt_text" varchar(255),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portfolio_builder_seo" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portfolio_builder_account" (
	"userId" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"providerAccountId" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT portfolio_builder_account_provider_providerAccountId PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portfolio_builder_session" (
	"sessionToken" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portfolio_builder_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"emailVerified" timestamp DEFAULT CURRENT_TIMESTAMP(3),
	"image" varchar(255),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portfolio_builder_verificationToken" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT portfolio_builder_verificationToken_identifier_token PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "full_name_idx" ON "portfolio_builder_custom_page" ("full_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "slug_idx" ON "portfolio_builder_custom_page" ("full_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "portfolio_builder_custom_page" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "custom_page_id_idx" ON "portfolio_builder_social_link" ("custom_page_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "portfolio_builder_social_link" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "portfolio_builder_social_link" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "alt_text_idx" ON "portfolio_builder_image" ("alt_text");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "portfolio_builder_image" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "title_idx" ON "portfolio_builder_seo" ("title");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "description_idx" ON "portfolio_builder_seo" ("description");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "portfolio_builder_seo" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "userId_idx" ON "portfolio_builder_account" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "userId_idx" ON "portfolio_builder_session" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "portfolio_builder_user" ("created_at");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portfolio_builder_custom_page" ADD CONSTRAINT "portfolio_builder_custom_page_profile_image_id_portfolio_builder_image_id_fk" FOREIGN KEY ("profile_image_id") REFERENCES "portfolio_builder_image"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portfolio_builder_custom_page" ADD CONSTRAINT "portfolio_builder_custom_page_seo_id_portfolio_builder_seo_id_fk" FOREIGN KEY ("seo_id") REFERENCES "portfolio_builder_seo"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portfolio_builder_social_link" ADD CONSTRAINT "portfolio_builder_social_link_custom_page_id_portfolio_builder_custom_page_id_fk" FOREIGN KEY ("custom_page_id") REFERENCES "portfolio_builder_custom_page"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portfolio_builder_account" ADD CONSTRAINT "portfolio_builder_account_userId_portfolio_builder_user_id_fk" FOREIGN KEY ("userId") REFERENCES "portfolio_builder_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portfolio_builder_session" ADD CONSTRAINT "portfolio_builder_session_userId_portfolio_builder_user_id_fk" FOREIGN KEY ("userId") REFERENCES "portfolio_builder_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
