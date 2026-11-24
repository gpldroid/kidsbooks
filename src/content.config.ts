import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const books = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/books" }),
  schema: z.object({
    title: z.string().min(3).max(90),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    description: z.string().min(20).max(220),
    age: z.string().min(1).max(20),
    pages: z.number().int().positive().max(200),
    category: z.string().min(2).max(40),
    keywords: z.array(z.string().min(2).max(60)).default([]),
    characters: z.array(z.enum(["fruits", "animals", "princesses", "heroes", "Naturaleza"])).default([]),
    cover: z.string().startsWith("/"),
    pdf: z.string().startsWith("/").optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    publishedAt: z.coerce.date()
  }).superRefine((book, context) => {
    if (!book.draft && !book.pdf) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["pdf"],
        message: "Un libro publicado debe incluir una ruta PDF."
      });
    }
    const normalizedKeywords = book.keywords.map((keyword) => keyword.trim().toLocaleLowerCase("es"));
    if (new Set(normalizedKeywords).size !== normalizedKeywords.length) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["keywords"],
        message: "Las palabras clave no deben repetirse."
      });
    }
  })
});

export const collections = { books };
