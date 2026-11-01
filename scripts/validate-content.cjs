const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const { i18n } = require('../next-i18next.config');

const root = path.resolve(__dirname, '..');
const modules = new Map();
const imagePaths = new Set();

// Evaluate data-only TS modules without requiring a Next.js image loader.
function loadDataModule(relativePath) {
  const filename = path.join(root, relativePath);
  if (modules.has(filename)) return modules.get(filename).exports;
  const source = fs.readFileSync(filename, 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  });
  const module = { exports: {} };
  modules.set(filename, module);
  const dataRequire = (specifier) => {
    if (specifier === './index') return loadDataModule('constants/index.ts');
    assert(specifier.startsWith('@assets/'), `Unexpected data import: ${specifier}`);
    const asset = path.join(root, specifier.replace('@assets/', 'assets/'));
    assert(fs.existsSync(asset), `Missing product image: ${specifier}`);
    imagePaths.add(asset);
    return { src: asset };
  };
  new Function('require', 'module', 'exports', 'process', outputText)(dataRequire, module, module.exports, process);
  return module.exports;
}

function leaves(value, prefix = '') {
  return Object.entries(value).flatMap(([key, item]) => {
    const fullKey = `${prefix}${key}`;
    return item && typeof item === 'object'
      ? leaves(item, `${fullKey}.`)
      : [[fullKey, item]];
  });
}

function placeholders(value) {
  return [...value.matchAll(/\{\{\s*([^}]+?)\s*\}\}/g)].map((match) => match[1]).sort();
}

const { ProductCategories } = loadDataModule('constants/index.ts');
const { ProductInfos } = loadDataModule('constants/productInfo.ts');
const { localeAttributes } = loadDataModule('constants/locales.ts');
assert.deepEqual(Object.keys(localeAttributes).sort(), [...i18n.locales].sort());
assert.equal(localeAttributes.arabic.lang, 'ar');
assert.equal(localeAttributes.arabic.dir, 'rtl');
const reference = new Map(leaves(JSON.parse(fs.readFileSync(path.join(root, 'public/locales/en/common.json'), 'utf8'))));
const referencedKeys = new Set();

function collectTranslationKeys(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      collectTranslationKeys(filename);
    } else if (/\.tsx?$/.test(entry.name)) {
      const source = ts.createSourceFile(filename, fs.readFileSync(filename, 'utf8'), ts.ScriptTarget.Latest, true);
      const visit = (node) => {
        if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 't') {
          const [key] = node.arguments;
          if (key && (ts.isStringLiteral(key) || ts.isNoSubstitutionTemplateLiteral(key))) referencedKeys.add(key.text);
        }
        ts.forEachChild(node, visit);
      };
      visit(source);
    }
  }
}
for (const directory of ['components', 'pagerenders', 'constants']) collectTranslationKeys(path.join(root, directory));

for (const locale of i18n.locales) {
  const dictionary = JSON.parse(fs.readFileSync(path.join(root, `public/locales/${locale}/common.json`), 'utf8'));
  const strings = new Map(leaves(dictionary));
  for (const key of referencedKeys) assert(strings.has(key), `${locale}: UI references missing key ${key}`);
  for (const [key, value] of reference) {
    const translated = strings.get(key);
    assert(typeof translated === 'string' && translated.trim(), `${locale}: missing translation ${key}`);
    assert.deepEqual(placeholders(translated), placeholders(value), `${locale}: placeholders differ for ${key}`);
  }
  const translate = (key) => {
    const value = strings.get(key);
    assert(typeof value === 'string' && value.trim(), `${locale}: product data references missing key ${key}`);
    return value;
  };
  const categories = ProductCategories(translate);
  const products = ProductInfos(translate);
  assert.equal(new Set(categories.map(({ key }) => key)).size, categories.length, 'Duplicate category');
  assert.deepEqual(Object.keys(products).sort(), categories.map(({ key }) => key).sort());
  const ids = new Set();
  for (const category of categories) {
    const items = products[category.key];
    assert(items.length > 0, `${locale}: empty category ${category.key}`);
    assert.equal(new Set(items.map(({ id }) => id)).size, items.length, `Duplicate model in ${category.key}`);
    for (const item of items) {
      ids.add(item.id);
      const match = item.path.match(/^\/product#([^?]+)\?id=([^&]+)$/);
      assert(match && match[2] === item.id, `Invalid model URL: ${item.path}`);
      assert(products[match[1]]?.some(({ id }) => id === item.id), `Unresolvable model URL: ${item.path}`);
      assert(item.src && item.srcArr.length > 0 && item.srcArr.every(({ src }) => src), `Missing image for ${item.id}`);
      assert(item.desc.trim(), `Missing description for ${item.id}`);
      for (const value of Object.values(item.profile)) assert(typeof value === 'string' && value.trim());
    }
  }
  console.log(`${locale}: ${reference.size} translation keys, ${categories.length} categories, ${ids.size} unique models OK`);
}
console.log(`${imagePaths.size} product image imports OK`);
