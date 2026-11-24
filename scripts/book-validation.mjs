import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { PDFDocument } from "pdf-lib";

const ROOT = process.cwd();
const BOOKS_DIR = path.join(ROOT, "src/content/books");
const PUBLIC_DIR = path.join(ROOT, "public");
const SCRIPT_PATH = fileURLToPath(import.meta.url);

/**
 * Resolve a public asset path while preventing traversal outside public/.
 * @param {string} publicPath
 * @returns {string | null}
 */
export function resolvePublicAsset(publicPath) {
  if (typeof publicPath !== "string" || !publicPath.startsWith("/") || publicPath.startsWith("//")) return null;
  const resolved = path.resolve(PUBLIC_DIR, publicPath.slice(1));
  const relative = path.relative(PUBLIC_DIR, resolved);
  if (relative.startsWith("..") || path.isAbsolute(relative)) return null;
  return resolved;
}

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

  if (typeof data.title === "string" && (data.title.length < 3 || data.title.length > 90)) {
    errors.push(`${fileName}: title debe tener entre 3 y 90 caracteres.`);
  }
  if (typeof data.description === "string" && (data.description.length < 20 || data.description.length > 220)) {
    errors.push(`${fileName}: description debe tener entre 20 y 220 caracteres.`);
  }
  if (typeof data.age === "string" && data.age.length > 20) {
    errors.push(`${fileName}: age no puede superar 20 caracteres.`);
  }
  if (typeof data.category === "string" && (data.category.length < 2 || data.category.length > 40)) {
    errors.push(`${fileName}: category debe tener entre 2 y 40 caracteres.`);
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
  if (typeof data.publishedAt !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(data.publishedAt) || Number.isNaN(Date.parse(`${data.publishedAt}T00:00:00Z`))) {
    errors.push(`${fileName}: publishedAt debe ser una fecha válida (AAAA-MM-DD).`);
  }

  for (const key of ["cover", "pdf"]) {
    const value = data[key];
    if (value === undefined && key === "pdf" && data.draft === true) continue;
    if (value === undefined && key === "pdf") {
      errors.push(`${fileName}: un libro publicado necesita la ruta pdf.`);
      continue;
    }
    if (typeof value !== "string") {
      errors.push(`${fileName}: ${key} debe ser una ruta de texto.`);
      continue;
    }
    const diskPath = resolvePublicAsset(value);
    if (!diskPath) {
      errors.push(`${fileName}: ${key} debe ser una ruta local segura que empiece por /.`);
      continue;
    }
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
 * Validate the actual PDF page count against the book's declared page count.
 * @param {string} pdfPath
 * @param {number} expectedPages
 * @returns {Promise<string[]>}
 */
export async function validatePdfPageCount(pdfPath, expectedPages) {
  try {
    const bytes = await fs.promises.readFile(pdfPath);
    const document = await PDFDocument.load(bytes, { updateMetadata: false });
    const actualPages = document.getPageCount();
    const errors = [];
    if (actualPages !== expectedPages) {
      errors.push(`PDF ${pdfPath}: pages declara ${expectedPages}, pero el archivo contiene ${actualPages} páginas.`);
    }
    const expectedWidth = 595.2756;
    const expectedHeight = 841.8898;
    document.getPages().forEach((page, index) => {
      const { width, height } = page.getSize();
      const isA4Portrait = Math.abs(width - expectedWidth) <= 1 && Math.abs(height - expectedHeight) <= 1;
      if (!isA4Portrait) {
        errors.push(`PDF ${pdfPath}: la página ${index + 1} no es A4 vertical (${width.toFixed(2)} × ${height.toFixed(2)} pt).`);
      }
    });
    return errors;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return [`PDF ${pdfPath}: no se pudo leer o validar el documento: ${message}`];
  }
}

/**
 * @param {string} [directory]
 * @param {(path: import("node:fs").PathLike) => boolean} [exists]
 * @returns {Promise<{ errors: string[], checked: number }>}
 */
export async function validateBookDirectory(directory = BOOKS_DIR, exists = fs.existsSync) {
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

    if (typeof parsed.data.pdf === "string") {
      const pdfPath = resolvePublicAsset(parsed.data.pdf);
      if (pdfPath && exists(pdfPath) && typeof parsed.data.pages === "number") {
        errors.push(...await validatePdfPageCount(pdfPath, parsed.data.pages));
      }
    }
  }

  return { errors, checked: files.length };
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(SCRIPT_PATH)) {
  const result = await validateBookDirectory();
  if (result.errors.length) {
    console.error("Validación de libros: ERROR");
    for (const error of result.errors) console.error(`- ${error}`);
    process.exitCode = 1;
  } else {
    console.log(`Validación de libros: OK (${result.checked} archivo(s) Markdown revisado(s), PDFs contrastados con su paginación declarada).`);
  }
}
