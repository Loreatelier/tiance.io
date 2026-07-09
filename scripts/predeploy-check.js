const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

const forbiddenPatterns = [
  {
    pattern: /app-tiance-io\.vercel\.app/i,
    reason: "deleted legacy application host",
  },
  {
    pattern: /https:\/\/app\.tiance\.io/i,
    reason: "legacy hosted application URL",
  },
  {
    pattern: /"destination"\s*:\s*"[^"]*\/api\/applications/i,
    reason: "application API rewrite",
  },
  {
    pattern: /"destination"\s*:\s*"[^"]*\/_next/i,
    reason: "Next.js asset rewrite from deleted app",
  },
  {
    pattern: /"destination"\s*:\s*"[^"]*\/auth/i,
    reason: "auth rewrite from deleted app",
  },
  {
    pattern: /window\.TIANCE_APPLICATION_FORM_URL\s*=\s*["']\/apply["']/i,
    reason: "self-referential /apply form target",
  },
];

const scannedExtensions = new Set([
  ".html",
  ".js",
  ".json",
  ".md",
  ".css",
  ".ts",
]);

const ignoredDirectories = new Set([
  ".git",
  ".vercel",
  "assets",
  "docs",
  "node_modules",
]);

function walk(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name)) {
        files.push(...walk(entryPath));
      }
      continue;
    }

    if (entry.isFile() && scannedExtensions.has(path.extname(entry.name))) {
      files.push(entryPath);
    }
  }

  return files;
}

function relative(filePath) {
  return path.relative(root, filePath);
}

const failures = [];
const seoPages = [
  {
    file: "index.html",
    canonical: "https://tiance.io/",
    minWordTokens: 1200,
  },
  {
    file: path.join("zh", "index.html"),
    canonical: "https://tiance.io/zh/",
  },
  {
    file: "contact.html",
    canonical: "https://tiance.io/contact.html",
  },
];

for (const filePath of walk(root)) {
  const source = fs.readFileSync(filePath, "utf8");

  for (const { pattern, reason } of forbiddenPatterns) {
    if (pattern.test(source)) {
      failures.push(`${relative(filePath)}: contains ${reason}`);
    }
  }
}

const vercelConfigPath = path.join(root, "vercel.json");
const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, "utf8"));
const routeRules = [
  ...(Array.isArray(vercelConfig.rewrites) ? vercelConfig.rewrites : []),
  ...(Array.isArray(vercelConfig.redirects) ? vercelConfig.redirects : []),
];

for (const rule of routeRules) {
  if (rule.source === "/apply" && rule.destination !== "/apply.html") {
    failures.push(
      `vercel.json: /apply must resolve to /apply.html, got ${rule.destination}`
    );
  }
}

for (const { file, canonical, minWordTokens } of seoPages) {
  const filePath = path.join(root, file);
  const source = fs.readFileSync(filePath, "utf8");
  const title = source.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() || "";
  const description =
    source
      .match(/<meta\s+name="description"\s+content="([\s\S]*?)"/i)?.[1]
      ?.trim() || "";
  const h1Count = (source.match(/<h1[\s\S]*?>/gi) || []).length;
  const bodyText = source
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ");
  const wordTokens =
    bodyText.match(/[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)?|[\u4e00-\u9fff]/g) || [];

  if (title.length === 0 || title.length > 60) {
    failures.push(`${file}: title must be 1-60 characters, got ${title.length}`);
  }

  if (description.length === 0 || description.length > 160) {
    failures.push(
      `${file}: description must be 1-160 characters, got ${description.length}`
    );
  }

  if (h1Count !== 1) {
    failures.push(`${file}: expected exactly one H1, got ${h1Count}`);
  }

  if (!source.includes(`<link rel="canonical" href="${canonical}" />`)) {
    failures.push(`${file}: missing canonical ${canonical}`);
  }

  if (minWordTokens && wordTokens.length < minWordTokens) {
    failures.push(
      `${file}: expected at least ${minWordTokens} word tokens, got ${wordTokens.length}`
    );
  }

  for (const required of [
    'property="og:title"',
    'property="og:description"',
    'property="og:image"',
    'name="twitter:card"',
  ]) {
    if (!source.includes(required)) {
      failures.push(`${file}: missing ${required}`);
    }
  }
}

for (const requiredFile of ["robots.txt", "sitemap.xml", "llms.txt"]) {
  if (!fs.existsSync(path.join(root, requiredFile))) {
    failures.push(`${requiredFile}: missing SEO discovery file`);
  }
}

const middlewarePath = path.join(root, "middleware.ts");
if (fs.existsSync(middlewarePath)) {
  const middlewareSource = fs.readFileSync(middlewarePath, "utf8");
  for (const required of ['matcher: "/"', '"CN"', '"HK"', '"MO"', '"TW"', "tiance_locale"]) {
    if (!middlewareSource.includes(required)) {
      failures.push(`middleware.ts: missing locale routing guard ${required}`);
    }
  }
}

if (failures.length > 0) {
  console.error("Predeploy check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Predeploy check passed.");
