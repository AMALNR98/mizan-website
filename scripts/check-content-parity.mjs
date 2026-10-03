import fs from "node:fs";

const baseline = JSON.parse(fs.readFileSync("migration-baseline/content-seo-baseline.json", "utf8"));
const source = fs.readFileSync("lib/pages.ts", "utf8");
const match = source.match(/export const pages = ([\s\S]*?) as const satisfies/);
if (!match) {
  throw new Error("Could not locate generated page data in lib/pages.ts");
}
const pages = JSON.parse(match[1]);
const redirected = new Set(["/authority/", "/evidence/", "/public-purpose/"]);

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&copy;/g, "©")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, "\"")
    .replace(/\s+/g, " ")
    .trim();
}

const failures = [];
for (const [route, original] of Object.entries(baseline.routes)) {
  if (redirected.has(route)) continue;
  const migrated = pages[route];
  if (!migrated) {
    failures.push(route + ": missing migrated route");
    continue;
  }
  for (const key of ["title", "description", "canonical"]) {
    if (migrated[key] !== original[key]) {
      failures.push(route + ": " + key + " changed");
    }
  }
  const migratedText = visibleText(migrated.mainHtml);
  if (migratedText !== original.visibleText) {
    failures.push(route + ": visible main content changed");
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Content/SEO parity passed for " + Object.keys(pages).length + " migrated pages.");
console.log("Redirected legacy routes: /authority/ -> /platform/, /evidence/ -> /research/, /public-purpose/ -> /use-cases/");
