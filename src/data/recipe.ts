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

import type { EquipmentIcon } from '../theme/icons';

export type Equipment = { name: string; icon: EquipmentIcon };

/** A piece of step text, or an amount that follows the servings stepper. */
export type StepPart = string | { quantity: number; unit: Unit };
export type NutritionItem = { label: string; value: string; ofWhich?: boolean };

export type Recipe = {
  title: string;
  subtitle: string;
  totalTime: string;
  difficulty: string;
  tags: string[];
  allergens: { names: string[]; rowItems: string[]; mayContain: string; note: string };
  description: string;
  inYourBox: Ingredient[];
  fromYourPantry: Ingredient[];
  equipment: Equipment[];
  steps: StepPart[][];
  nutrition: NutritionItem[];
  /** Shown next to the collapsed Nutrition header. */
  nutritionSummary: string;
};

export const recipe: Recipe = {
  title: 'Tender Chicken Breast on Zucchini Vegetables',
  subtitle: 'with basmati rice, sugar snap peas and parsley yoghurt',
  totalTime: '40 min',
  difficulty: 'Medium',
  // The original's "SEO" tag is left out; it looks like an internal label.
  tags: ['High Protein', 'Something different'],
  allergens: {
    /** Short names, used for the ingredient markers. */
    names: ['Milk', 'Mustard'],
    /** The allergen row: "Contains: Milk (incl. lactose) · Mustard". */
    rowItems: ['Milk (incl. lactose)', 'Mustard'],
    /** Shown once, under the allergen row. */
    mayContain: 'May contain traces of other allergens.',
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
  equipment: [
    { name: 'Kettle', icon: 'kettle' },
    { name: 'Small pot with lid', icon: 'pot' },
    { name: 'Large pan', icon: 'pan' },
    { name: 'Small bowl', icon: 'bowl' },
    { name: 'Kitchen paper', icon: 'paper' },
  ],
  // Steps from content.md (shortened 2026-10-16: one task per step, obvious prep like washing left out).
  // Amounts are stored for 2 servings and follow the stepper.
  steps: [
    [
      'Boil ',
      { quantity: 300, unit: 'ml' },
      ' water in the kettle. Pour it into a small pot, salt it and add the rice. Cover and simmer on low ' +
        'heat for 10 min.',
    ],
    ['Cut the sugar snap peas into 0.5 cm pieces. Add them to the rice, cover and let steep for 10 min.'],
    ['Cut the zucchini into 0.5 cm half-moons and the onion into thin strips.'],
    [
      'Flatten the chicken a little and season with salt and pepper. Fry in ',
      { quantity: 0.5, unit: 'tbsp' },
      ' oil in a large pan over medium heat, 7–8 min per side. Set aside and keep warm.',
    ],
    ['Chop the parsley. In a small bowl, mix ⅔ of it with the yoghurt, mustard to taste, salt and pepper.'],
    [
      'Wipe the pan. Fry the onion and zucchini in ',
      { quantity: 1, unit: 'tbsp' },
      " oil over medium heat for 5–6 min. Season with za'atar, salt and pepper. Return the chicken to keep " +
        'it warm.',
    ],
    [
      'Fluff the rice with a fork and stir in ',
      { quantity: 0.5, unit: 'tbsp' },
      ' butter. Serve with the chicken and vegetables, topped with the parsley yoghurt and the remaining ' +
        'parsley.',
    ],
  ],
  // content.md doesn't say whether these are per serving, so they don't scale (docs/decisions.md).
  nutrition: [
    { label: 'Energy', value: '2736 kJ · 654 kcal' },
    { label: 'Fat', value: '17 g' },
    { label: 'of which saturates', value: '7 g', ofWhich: true },
    { label: 'Carbohydrates', value: '74 g' },
    { label: 'of which sugars', value: '11 g', ofWhich: true },
    { label: 'Fibre', value: '6 g' },
    { label: 'Protein', value: '50 g' },
    { label: 'Salt', value: '2 g' },
  ],
  nutritionSummary: '654 kcal',
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

/** A step's text for the chosen servings: "Heat 300 ml water…" at 2, "Heat 600 ml water…" at 4. */
export function stepText(parts: StepPart[], servings: number): string {
  // A non-breaking space keeps "½ tbsp" together on one line.
  return parts.map((p) => (typeof p === 'string' ? p : scaleAmount(p, servings).replace(' ', '\u00A0'))).join('');
}
