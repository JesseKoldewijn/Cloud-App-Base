import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { notes, notesConfig } from "~/server/db/schema";
import { slugify } from "~/utils/slugify";

export const noteRouter = createTRPCRouter({
  // Create POST method for inserting posts
  create: publicProcedure
    .input(
      z.object({
        name: z
          .string()
          .min(notesConfig.name.minLength)
          .max(notesConfig.name.maxLength),
        content: z
          .string()
          .min(notesConfig.content.minLength)
          .max(notesConfig.content.maxLength),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const slug = slugify(input.name);

      const nameExist = await ctx.db.query.notes.findFirst({
        where: (notes, { eq }) => eq(notes.slug, slug),
      });

      if (nameExist) {
        throw new Error("Name/Slug already exists");
      }

      await ctx.db.insert(notes).values({
        name: input.name,
        content: input.content,
        slug: slug,
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const note = await ctx.db.query.notes.findFirst({
      orderBy: (notes, { desc }) => [desc(notes.createdAt)],
    });

    return note ?? null;
  }),
});
