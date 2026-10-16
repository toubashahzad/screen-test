/** Screen-reader text for amounts: "1½ tbsp" → "1 and a half tablespoons". */

const UNITS: Record<string, [singular: string, plural: string]> = {
  g: ['gram', 'grams'],
  ml: ['millilitre', 'millilitres'],
  tbsp: ['tablespoon', 'tablespoons'],
  tsp: ['teaspoon', 'teaspoons'],
  piece: ['piece', 'pieces'],
  pieces: ['piece', 'pieces'],
  min: ['minute', 'minutes'],
  kJ: ['kilojoule', 'kilojoules'],
  kcal: ['kilocalorie', 'kilocalories'],
};

const FRACTIONS: Record<string, { alone: (unit: string) => string; after: string }> = {
  '¼': { alone: (u) => `a quarter of a ${u}`, after: 'and a quarter' },
  '½': { alone: (u) => `half a ${u}`, after: 'and a half' },
  '¾': { alone: (u) => `three quarters of a ${u}`, after: 'and three quarters' },
};

/** Spells out units and fractions for screen readers. Text without a number ("to taste") stays as it is. */
export function spokenAmount(amount: string): string {
  const match = amount.trim().match(/^(\d+)?\s*([¼½¾])?\s*(.*)$/);
  if (!match || (!match[1] && !match[2])) return amount;
  const [, whole, fraction, unitText] = match;
  const [singular, plural] = UNITS[unitText] ?? [unitText, unitText];

  if (!whole && fraction) return FRACTIONS[fraction].alone(singular);
  const n = Number(whole);
  if (fraction) return `${n} ${FRACTIONS[fraction].after} ${plural}`.trim();
  return `${n} ${n === 1 ? singular : plural}`.trim();
}
