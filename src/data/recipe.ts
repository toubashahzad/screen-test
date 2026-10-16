/**
 * Recipe content, taken only from docs/content.md. Nothing here is invented.
 * Amounts are stored for BASE_SERVINGS (2) and calculated for the chosen servings.
 */

export const BASE_SERVINGS = 2;
export const MIN_SERVINGS = 1;
export const MAX_SERVINGS = 6;

/** 'piece' is shown as "piece"/"pieces". `null` quantity means "to taste". */
export type Unit = 'piece' | 'g' | 'ml' | 'tbsp';

export type Amount = { quantity: number; unit: Unit } | { quantity: null };

export type Ingredient = {
  name: string;
  /** For BASE_SERVINGS. */
  amount: Amount;
  /** Allergen this ingredient contains, e.g. "Milk". */
  allergen?: string;
};

export type Recipe = {
  title: string;
  subtitle: string;
  totalTime: string;
  difficulty: string;
  tags: string[];
  allergens: { names: string[]; details: string[]; note: string };
  description: string;
  inYourBox: Ingredient[];
  fromYourPantry: Ingredient[];
  equipment: string[];
};

export const recipe: Recipe = {
  title: 'Tender Chicken Breast on Zucchini Vegetables',
  subtitle: 'with basmati rice, sugar snap peas and parsley yoghurt',
  totalTime: '40 min',
  difficulty: 'Medium',
  // The original's "SEO" tag is left out; it looks like an internal label.
  tags: ['High Protein', 'Something different'],
  allergens: {
    /** Short names for the allergen row: "Contains: Milk · Mustard". */
    names: ['Milk', 'Mustard'],
    /** Full wording from content.md, shown under the allergen row. */
    details: ['Milk (incl. lactose)', 'May contain traces of other allergens'],
    note: 'Please also check the ingredient and allergen information on the product label.',
  },
  // content.md cuts the description off ("… Read more"); this is all the text there is.
  description:
    'Today a light dish is waiting to surprise you right on time for the new year, after the last few days of ' +
    'festive feasting. Basmati rice with sugar snap peas is the side,…',
  inYourBox: [
    { name: 'Chicken breast', amount: { quantity: 2, unit: 'piece' } },
    { name: 'Basmati rice', amount: { quantity: 150, unit: 'g' } },
    { name: 'Sugar snap peas', amount: { quantity: 100, unit: 'g' } },
    { name: 'Zucchini', amount: { quantity: 1, unit: 'piece' } },
    { name: 'Onion', amount: { quantity: 1, unit: 'piece' } },
    { name: 'Parsley', amount: { quantity: 10, unit: 'g' } },
    { name: 'Yoghurt', amount: { quantity: 150, unit: 'g' }, allergen: 'Milk' },
    { name: "Za'atar", amount: { quantity: 2, unit: 'g' } },
    { name: 'Medium-hot mustard', amount: { quantity: 10, unit: 'ml' }, allergen: 'Mustard' },
  ],
  // Pantry amounts are worked out from the steps (content.md).
  fromYourPantry: [
    { name: 'Oil', amount: { quantity: 1.5, unit: 'tbsp' } },
    { name: 'Butter', amount: { quantity: 0.5, unit: 'tbsp' }, allergen: 'Milk' },
    { name: 'Salt', amount: { quantity: null } },
    { name: 'Pepper', amount: { quantity: null } },
  ],
  equipment: ['Kettle', 'Small pot with lid', 'Large pan', 'Small bowl', 'Kitchen paper'],
};

// ─── Scaling ─────────────────────────────────────────────────────────────────

const FRACTION_GLYPHS: Record<number, string> = { 0.25: '¼', 0.5: '½', 0.75: '¾' };

/** Rounds to the nearest ¼, never below ¼ (a little is still some). */
function roundToQuarter(n: number): number {
  return Math.max(0.25, Math.round(n * 4) / 4);
}

/** 1.5 → "1½", 0.25 → "¼", 3 → "3". */
function formatQuarters(n: number): string {
  const whole = Math.floor(n);
  const fraction = n - whole;
  const glyph = FRACTION_GLYPHS[fraction] ?? '';
  return whole === 0 ? glyph : `${whole}${glyph}`;
}

/**
 * The amount for the chosen number of servings, as display text.
 * Rules (docs/decisions.md): g and ml round to whole numbers; tbsp and pieces round to the nearest ¼;
 * "piece" becomes "pieces" above 1; "to taste" never changes.
 */
export function scaleAmount(amount: Amount, servings: number): string {
  if (amount.quantity === null) return 'to taste';
  const scaled = (amount.quantity * servings) / BASE_SERVINGS;

  switch (amount.unit) {
    case 'g':
    case 'ml':
      return `${Math.max(1, Math.round(scaled))} ${amount.unit}`;
    case 'tbsp':
      return `${formatQuarters(roundToQuarter(scaled))} tbsp`;
    case 'piece': {
      const q = roundToQuarter(scaled);
      return `${formatQuarters(q)} ${q > 1 ? 'pieces' : 'piece'}`;
    }
  }
}
