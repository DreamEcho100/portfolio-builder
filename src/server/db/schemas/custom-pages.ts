import { relations, sql } from "drizzle-orm";
import { pgEnum, index, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { pgTable } from "../utils";
import { createRandomSlug } from "../../../libs/utils/createRandomSlug";
import { images, seo } from "./general";

export const customPagesTemplateType = pgEnum("template_type", [
  "BASIC",
  "MODERN",
]);
export const socialLinksType = pgEnum("type", [
  "LINKEDIN",
  "FACEBOOK",
  "WEBSITE",
]);

export const customPages = pgTable(
  "custom_page",
  {
    id: varchar("id", { length: 255 })
      .primaryKey()
      .notNull()
      .$default(createId),
    slug: varchar("slug", { length: 255 }).$default(createRandomSlug),
    // tesSlug: varchar("test_slug", { length: 255 }).$default(createRandomSlug),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    jobTitle: varchar("job_title", { length: 255 }).notNull(),
    bio: text("bio"),
    profileImageId: varchar("profile_image_id", { length: 255 }).references(
      () => images.id,
    ),
    seoId: varchar("seo_id", { length: 255 }).references(() => seo.id),
    // userId: varchar("user_id", { length: 255 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"), // .onUpdateNow(),
    templateType: customPagesTemplateType("template_type").default("BASIC"),
  },
  (customPage) => ({
    // userIdIdx: index("user_id_idx").on(customPages.userId),
    fullNameIndex: index("full_name_idx").on(customPage.fullName),
    slug: index("slug_idx").on(customPage.fullName),
    createdAtIndex: index("created_at_idx").on(customPage.createdAt),
    // userIdSlugUnq: unique("user_id_slug_unq").on(
    //   customPages.userId,
    //   customPages.slug,
    // ),
  }),
);

export const socialLinks = pgTable(
  "social_link",
  {
    id: varchar("id", { length: 255 }).primaryKey().$default(createId),
    title: varchar("title", { length: 255 }).notNull(),
    url: varchar("url", { length: 255 }).notNull(),
    type: socialLinksType("type").default("WEBSITE"),

    customPageId: varchar("custom_page_id", { length: 255 })
      .notNull()
      .references(() => customPages.id),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"), // .onUpdateNow(),
  },
  (socialLink) => ({
    customPageIdIdx: index("custom_page_id_idx").on(socialLink.customPageId),
    titleIndex: index("title_idx").on(socialLink.title),
    createdAtIndex: index("created_at_idx").on(socialLink.createdAt),
    // userIdSlugUnq: unique("user_id_slug_unq").on(
    //   socialLinks.userId,
    //   socialLinks.slug,
    // ),
  }),
);

export const customPagesRelations = relations(customPages, ({ many, one }) => ({
  profileImage: one(images, {
    fields: [customPages.profileImageId],
    references: [images.id],
  }),
  seo: one(seo, { fields: [customPages.seoId], references: [seo.id] }),
  socialLinks: many(socialLinks),
}));

export const socialLinksRelations = relations(socialLinks, ({ one }) => ({
  customPage: one(customPages, {
    fields: [socialLinks.customPageId],
    references: [customPages.id],
  }),
}));
