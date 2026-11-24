import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const BOOKS_DIR = path.join(ROOT, "src/content/books");
const PUBLIC_DIR = path.join(ROOT, "public");

/**
 * @param {Record<string, unknown>} data
 * @param {string} fileName
 * @param {(path: import("node:fs").PathLike) => boolean} [exists]
 * @returns {string[]}
 */
export function validateBook(data, fileName, exists = fs.existsSync) {
  const errors = [];
  const requiredStrings = ["title", "slug", "description", "age", "category", "cover"];
  for (const key of requiredStrings) {
    if (typeof data[key] !== "string" || data[key].trim() === "") {
      errors.push(`${fileName}: "${key}" es obligatorio y debe ser texto.`);
    }
  }

  if (typeof data.slug === "string" && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug)) {
    errors.push(`${fileName}: slug debe usar minúsculas, números y guiones.`);
  }
  if (typeof data.pages !== "number" || !Number.isInteger(data.pages) || data.pages < 1 || data.pages > 200) {
    errors.push(`${fileName}: pages debe ser un entero entre 1 y 200.`);
  }
  if (typeof data.draft !== "boolean") {
    errors.push(`${fileName}: draft debe ser true o false.`);
  }
  if (typeof data.featured !== "boolean") {
    errors.push(`${fileName}: featured debe ser true o false.`);
  }
  if (typeof data.publishedAt !== "string" || Number.isNaN(Date.parse(data.publishedAt))) {
    errors.push(`${fileName}: publishedAt debe ser una fecha válida (AAAA-MM-DD).`);
  }

  for (const key of ["cover", "pdf"]) {
    const value = data[key];
    if (value === undefined && key === "pdf" && data.draft === true) continue;
    if (value === undefined && key === "pdf") {
      errors.push(`${fileName}: un libro publicado necesita la ruta pdf.`);
      continue;
    }
    if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) {
      errors.push(`${fileName}: ${key} debe ser una ruta local que empiece por /.`);
      continue;
    }
    const diskPath = path.join(PUBLIC_DIR, value.replace(/^\\/+/, ""));
    if (!exists(diskPath)) errors.push(`${fileName}: no existe el archivo indicado en ${key}: ${value}`);
    if (key === "pdf" && value && !value.toLowerCase().endsWith(".pdf")) {
      errors.push(`${fileName}: el archivo pdf debe terminar en .pdf.`);
    }
  }

  if (data.draft === false && typeof data.pdf !== "string") {
    errors.push(`${fileName}: no publiques el libro sin un PDF final.`);
  }
  return errors;
}

/**
 * @param {string} [directory]
 * @param {(path: import("node:fs").PathLike) => boolean} [exists]
 * @returns {{ errors: string[], checked: number }}
 */
export function validateBookDirectory(directory = BOOKS_DIR, exists = fs.existsSync) {
  if (!fs.existsSync(directory)) return { errors: [`No existe el directorio ${directory}`], checked: 0 };
  const files = fs.readdirSync(directory).filter((name) => name.endsWith(".md"));
  const errors = [];
  const slugs = new Map();

  for (const fileName of files) {
    const fullPath = path.join(directory, fileName);
    let parsed;
    try {
      parsed = matter(fs.readFileSync(fullPath, "utf8"));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      errors.push(`${fileName}: frontmatter YAML inválido: ${message}`);
      continue;
    }
    errors.push(...validateBook(parsed.data, fileName, exists));
    const slug = parsed.data.slug;
    if (typeof slug === "string") {
      if (slugs.has(slug)) errors.push(`Slug duplicado "${slug}" en ${slugs.get(slug)} y ${fileName}.`);
      else slugs.set(slug, fileName);
    }
  }

  return { errors, checked: files.length };
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  const result = validateBookDirectory();
  if (result.errors.length) {
    console.error("Validación de libros: ERROR");
    for (const error of result.errors) console.error(`- ${error}`);
    process.exitCode = 1;
  } else {
    console.log(`Validación de libros: OK (${result.checked} archivo(s) Markdown revisado(s)).`);
  }
}
