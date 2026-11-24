import test from "node:test";
import assert from "node:assert/strict";
import { validateBook } from "./book-validation.mjs";

const validBook = {
  title: "Animales adorables",
  slug: "animales-adorables",
  description: "Una colección de dibujos sencillos para colorear en familia.",
  age: "3-6",
  pages: 20,
  category: "Animales",
  cover: "/images/cover-animales.svg",
  pdf: "/books/animales.pdf",
  draft: false,
  featured: true,
  publishedAt: "2026-11-24"
};

test("acepta un libro completo con archivos existentes", () => {
  assert.deepEqual(validateBook(validBook, "book.md", () => true), []);
});

test("rechaza slug con mayúsculas o espacios", () => {
  assert.ok(validateBook({ ...validBook, slug: "Animales adorables" }, "book.md", () => true).some((error) => error.includes("slug")));
});

test("rechaza un libro publicado sin PDF", () => {
  const { pdf, ...book } = validBook;
  assert.ok(validateBook(book, "book.md", () => true).some((error) => error.includes("pdf")));
});

test("permite borrador sin PDF y exige portada", () => {
  const { pdf, ...book } = validBook;
  assert.deepEqual(validateBook({ ...book, draft: true }, "draft.md", (filePath) => String(filePath).endsWith("cover-animales.svg")), []);
});

test("detecta archivos locales inexistentes", () => {
  assert.ok(validateBook(validBook, "book.md", () => false).some((error) => error.includes("no existe")));
});
