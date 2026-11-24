import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { PDFDocument } from "pdf-lib";
import { resolvePublicAsset, validateBook, validatePdfPageCount } from "./book-validation.mjs";

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

test("rechaza rutas que intentan salir de public/", () => {
  assert.equal(resolvePublicAsset("/../../src/content.config.ts"), null);
  assert.equal(resolvePublicAsset("//example.com/book.pdf"), null);
});

test("verifica el número real de páginas del PDF", async () => {
  const directory = await fs.promises.mkdtemp(path.join(os.tmpdir(), "kidsbooks-pdf-"));
  const pdfPath = path.join(directory, "sample.pdf");
  try {
    const pdf = await PDFDocument.create();
    pdf.addPage();
    pdf.addPage();
    await fs.promises.writeFile(pdfPath, await pdf.save());
    assert.deepEqual(await validatePdfPageCount(pdfPath, 2), []);
    assert.ok((await validatePdfPageCount(pdfPath, 3))[0].includes("contiene 2 páginas"));
  } finally {
    await fs.promises.rm(directory, { recursive: true, force: true });
  }
});

test("detecta PDF corrupto o ilegible", async () => {
  const directory = await fs.promises.mkdtemp(path.join(os.tmpdir(), "kidsbooks-invalid-pdf-"));
  const pdfPath = path.join(directory, "broken.pdf");
  try {
    await fs.promises.writeFile(pdfPath, "not a PDF");
    assert.ok((await validatePdfPageCount(pdfPath, 1))[0].includes("no se pudo leer"));
  } finally {
    await fs.promises.rm(directory, { recursive: true, force: true });
  }
});
