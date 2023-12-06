import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const customPagesRouter = createTRPCRouter({
  createOne: publicProcedure
    .input(
      z.object({
        fullName: z.string().min(1),
        bio: z.string().min(1),
        templateType: z.enum(["BASIC", "MODERN"]),
        profileImage: z.object({
          url: z.string().min(1),
          altText: z.string().min(1).optional(),
        }),
        socialLinks: z.array(
          z.object({
            title: z.string().min(1),
            url: z.string().min(1),
            type: z.enum(["LINKEDIN", "FACEBOOK", "WEBSITE"]),
          }),
        ),
        seo: z.object({
          title: z.string().min(1),
          description: z.string().min(1).optional(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [seo, profileImage] = await Promise.all([
        ctx.db
          .insert(ctx.dbSchema.seo)
          .values({
            title: input.seo.title,
            description: input.seo.description,
          })
          .returning()
          .then((result) => result[0]),
        await ctx.db
          .insert(ctx.dbSchema.images)
          .values({
            url: input.profileImage.url,
            altText: input.profileImage.altText,
          })
          .returning()
          .then((result) => result[0]),
      ]);

      const customPage = await ctx.db
        .insert(ctx.dbSchema.customPages)
        .values({
          fullName: input.fullName,
          bio: input.bio,
          templateType: input.templateType,
          seoId: seo?.id,
          profileImageId: profileImage?.id,
        })
        .returning()
        .then((result) => result[0]!);

      const socialLinks = await ctx.db
        .insert(ctx.dbSchema.socialLinks)
        .values(
          input.socialLinks.map((socialLink) => ({
            title: socialLink.title,
            url: socialLink.url,
            type: socialLink.type,
            customPageId: customPage.id,
          })),
        )
        .returning();

      return {
        ...customPage,
        profileImage,
        seo,
        socialLinks,
      };
    }),

  getManyBasic: publicProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.query.customPages.findFirst({
        with: { seo: true, profileImage: true },
        where(fields, operators) {
          return operators.eq(fields.slug, input.slug);
        },
      });

      if (!result) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The page is not found",
        });
      }

      return result;
    }),

  getOne: publicProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.query.customPages.findFirst({
        with: { socialLinks: true, seo: true, profileImage: true },
        where(fields, operators) {
          return operators.eq(fields.slug, input.slug);
        },
      });

      if (!result) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The page is not found",
        });
      }

      return result;
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
