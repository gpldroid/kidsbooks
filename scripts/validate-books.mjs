import { validateBookDirectory } from "./book-validation.mjs";
const result = validateBookDirectory();
if (result.errors.length) {
  console.error("❌ La biblioteca contiene errores:");
  for (const error of result.errors) console.error(`  • ${error}`);
  process.exit(1);
}
console.log(`✓ Biblioteca válida: ${result.checked} archivo(s) revisado(s).`);
