#!/usr/bin/env node
/**
 * Token check (npm run check:tokens).
 *
 * Fails if any file in app/ or src/ (except src/theme/) contains:
 *   1. a colour literal: hex code (#1D6B3B), rgb()/rgba()/hsl()/hsla()
 *   2. a raw style number: a number used for spacing, size, radius, font size,
 *      line height, shadow, opacity, etc.
 *
 * Allowed literals (CLAUDE.md): 0, 1 (hairline borders), '100%' and flex values.
 * Numbers in content and maths (e.g. "150 g", max servings 6) are not style values
 * and are ignored. Index lookups like space[4] are token references, also ignored.
 */
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const ROOT = path.resolve(__dirname, '..');
const SCAN_DIRS = ['app', 'src'];
const EXCLUDE_DIRS = [path.join(ROOT, 'src', 'theme')];
const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx']);

// Style keys whose numeric value must come from a token.
const STYLE_KEYS = new Set([
  'width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight',
  'margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight',
  'marginHorizontal', 'marginVertical', 'marginStart', 'marginEnd',
  'padding', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight',
  'paddingHorizontal', 'paddingVertical', 'paddingStart', 'paddingEnd',
  'top', 'bottom', 'left', 'right', 'start', 'end', 'inset',
  'gap', 'rowGap', 'columnGap',
  'borderRadius', 'borderTopLeftRadius', 'borderTopRightRadius',
  'borderBottomLeftRadius', 'borderBottomRightRadius',
  'borderWidth', 'borderTopWidth', 'borderBottomWidth', 'borderLeftWidth', 'borderRightWidth',
  'outlineWidth', 'outlineOffset',
  'fontSize', 'lineHeight', 'letterSpacing',
  'shadowOpacity', 'shadowRadius', 'shadowOffset', 'elevation', 'boxShadow',
  'opacity', 'aspectRatio',
]);
// Style keys that may hold any number (flex values).
const FLEX_KEYS = new Set(['flex', 'flexGrow', 'flexShrink']);
// JSX props that are sizes, e.g. <Icon size={24} />, hitSlop={8}.
const SIZE_PROPS = new Set(['size', 'hitSlop', 'width', 'height', 'strokeWidth', 'pressRetentionOffset']);

const ALLOWED_NUMBERS = new Set([0, 1]);
const ALLOWED_STRINGS = new Set(['100%']);
const COLOR_RE = /#[0-9a-fA-F]{3,8}\b|\b(rgba?|hsla?)\s*\(/;
const UNIT_RE = /-?\d*\.?\d+\s*((px|pt|em|rem)\b|%)/;

const problems = new Map(); // "file:line:col" -> message (one report per spot)

function walkDir(dir, out) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || EXCLUDE_DIRS.includes(full)) continue;
      walkDir(full, out);
    } else if (EXTENSIONS.has(path.extname(entry.name))) {
      out.push(full);
    }
  }
}

function propName(node) {
  if (!node) return undefined;
  if (ts.isIdentifier(node) || ts.isStringLiteral(node)) return node.text;
  return undefined;
}

function isStyleSheetCreate(node) {
  return (
    ts.isCallExpression(node) &&
    ts.isPropertyAccessExpression(node.expression) &&
    node.expression.name.text === 'create' &&
    ts.isIdentifier(node.expression.expression) &&
    node.expression.expression.text === 'StyleSheet'
  );
}

function checkFile(file) {
  const text = fs.readFileSync(file, 'utf8');
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true,
    file.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const rel = path.relative(ROOT, file);

  const report = (node, message) => {
    const { line, character } = source.getLineAndCharacterOfPosition(node.getStart());
    const where = `${rel}:${line + 1}:${character + 1}`;
    if (!problems.has(where)) problems.set(where, message);
  };

  // Check a style value: flag numbers and unit strings, skipping token index lookups.
  const checkValue = (valueNode, key) => {
    const visit = (n) => {
      if (ts.isElementAccessExpression(n)) {
        visit(n.expression); // space[4]: the 4 is a token name, not a value
        return;
      }
      if (ts.isPropertyAssignment(n)) {
        const k = propName(n.name);
        if (k && FLEX_KEYS.has(k)) return;
      }
      if (ts.isNumericLiteral(n)) {
        const value = Number(n.text);
        if (!ALLOWED_NUMBERS.has(value)) {
          report(n, `raw style number ${n.text}${key ? ` in "${key}"` : ''}: use a token`);
        }
        return;
      }
      if ((ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) &&
          UNIT_RE.test(n.text) && !ALLOWED_STRINGS.has(n.text)) {
        report(n, `raw style value '${n.text}'${key ? ` in "${key}"` : ''}: use a token`);
        return;
      }
      ts.forEachChild(n, visit);
    };
    visit(valueNode);
  };

  const visit = (node) => {
    // 1. Colour literals anywhere in strings.
    if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) ||
         ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) &&
        COLOR_RE.test(node.text)) {
      report(node, `colour literal '${node.text}': use a color.* token`);
    }

    // 2a. Everything inside StyleSheet.create({...}) is a style.
    if (isStyleSheetCreate(node)) {
      node.arguments.forEach((arg) => checkValue(arg));
    }

    // 2b. style={...} / contentContainerStyle={...} and size props on JSX elements.
    if (ts.isJsxAttribute(node) && node.initializer) {
      const name = node.name.getText(source);
      const isStyle = name === 'style' || name.endsWith('Style');
      if (isStyle || SIZE_PROPS.has(name)) {
        const init = ts.isJsxExpression(node.initializer) ? node.initializer.expression : node.initializer;
        if (init) checkValue(init, name);
        return; // already checked this subtree
      }
    }

    // 2c. Style keys in any object literal, e.g. const box = { padding: 12 }.
    if (ts.isPropertyAssignment(node)) {
      const key = propName(node.name);
      if (key && STYLE_KEYS.has(key)) {
        checkValue(node.initializer, key);
        return;
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(source);
}

const files = [];
SCAN_DIRS.forEach((d) => walkDir(path.join(ROOT, d), files));
files.forEach(checkFile);

const unique = [...problems].map(([where, message]) => `${where}  ${message}`);

if (unique.length > 0) {
  console.error(`Token check failed: ${unique.length} problem(s)\n`);
  unique.forEach((p) => console.error(`  ${p}`));
  console.error('\nOnly src/theme/ may contain raw style values. Use tokens instead.');
  process.exit(1);
}
console.log(`Token check passed: ${files.length} file(s) scanned, no raw style values outside src/theme/.`);
