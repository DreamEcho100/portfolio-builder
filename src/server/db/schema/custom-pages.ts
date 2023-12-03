import { relations, sql } from "drizzle-orm";
import {
  mysqlEnum,
  index,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { createId } from "@paralleldrive/cuid2";
import { mysqlTable } from "../utils";
import { createRandomSlug } from "~/libs/utils";

export const customPages = mysqlTable(
  "custom_page",
  {
    id: varchar("id", { length: 255 }).primaryKey().default(createId()),
    slug: varchar("slug", { length: 255 }).default(createRandomSlug()),
    fullName: varchar("full_name", { length: 255 }),
    bio: text("bio"),
    // userId: varchar("user_id", { length: 255 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
    templateType: mysqlEnum("template_type", ["BASIC", "STANDARD"]),
  },
  (customPages) => ({
    // userIdIdx: index("user_id_idx").on(customPages.userId),
    fullNameIndex: index("full_name_idx").on(customPages.fullName),
    slug: index("slug_idx").on(customPages.fullName),
    // userIdSlugUnq: unique("user_id_slug_unq").on(
    //   customPages.userId,
    //   customPages.slug,
    // ),
  }),
);

export const socialLinks = mysqlTable(
  "social_link",
  {
    id: varchar("id", { length: 255 }).primaryKey().default(createId()),
    name: varchar("name", { length: 255 }).notNull(),
    src: varchar("src", { length: 255 }).notNull(),
    type: mysqlEnum("type", ["LINKEDIN", "FACEBOOK", "WEBSITE"]).default(
      "WEBSITE",
    ),

    customPageId: varchar("custom_page_id", { length: 255 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (socialLinks) => ({
    customPageIdIdx: index("custom_page_id_idx").on(socialLinks.customPageId),
    nameIndex: index("name_idx").on(socialLinks.name),
    // userIdSlugUnq: unique("user_id_slug_unq").on(
    //   socialLinks.userId,
    //   socialLinks.slug,
    // ),
  }),
);

export const customPagesRelations = relations(customPages, ({ many }) => ({
  // user: one(users, { fields: [customPages.userId], references: [users.id] }),
  socialLinks: many(socialLinks),
}));

export const socialLinksRelations = relations(socialLinks, ({ one }) => ({
  customPage: one(customPages, {
    fields: [socialLinks.customPageId],
    references: [customPages.id],
  }),
}));
