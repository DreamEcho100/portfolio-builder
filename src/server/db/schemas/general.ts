import { sql } from "drizzle-orm";
import { index, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { pgTable } from "../utils";

export const images = pgTable(
  "image",
  {
    id: varchar("id", { length: 255 }).primaryKey().$default(createId),
    url: varchar("url", { length: 255 }).notNull(),
    altText: varchar("alt_text", { length: 255 }),

    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"), // .onUpdateNow(),
  },
  (image) => ({
    altTextIndex: index("alt_text_idx").on(image.altText),
    createdAtIndex: index("created_at_idx").on(image.createdAt),
    // userIdSlugUnq: unique("user_id_slug_unq").on(
    //   socialLinks.userId,
    //   socialLinks.slug,
    // ),
  }),
);

// export const imagesRelations = relations(images, ({ one }) => ({
//   customPage: one(customPages, { fields: [images.customPageId], references: [customPages.id] }),
// }));

export const seo = pgTable(
  "seo",
  {
    id: varchar("id", { length: 255 }).primaryKey().$default(createId),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),

    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"), // .onUpdateNow(),
  },
  (seo) => ({
    titleIndex: index("title_idx").on(seo.title),
    descriptionIndex: index("description_idx").on(seo.description),
    createdAtIndex: index("created_at_idx").on(seo.createdAt),
    // userIdSlugUnq: unique("user_id_slug_unq").on(
    //   socialLinks.userId,
    //   socialLinks.slug,
    // ),
  }),
);
