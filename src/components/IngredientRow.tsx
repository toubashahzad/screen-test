import { Image, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { color, radius, size, space, type } from '../theme/tokens';
import { Tag } from './Tag';

export type IngredientRowVariant = 'box' | 'pantry' | 'equipment';
export type EquipmentIcon = 'kettle' | 'pot' | 'pan' | 'bowl' | 'paper';

// One icon set only (CLAUDE.md): MaterialCommunityIcons, outline style.
// The set has no frying pan; pot-mix-outline (shallow pan with spatula) is the closest.
const EQUIPMENT_ICONS = {
  kettle: 'kettle-outline',
  pot: 'pot-steam-outline',
  pan: 'pot-mix-outline',
  bowl: 'bowl-outline',
  paper: 'paper-roll-outline',
} as const;

export type IngredientRowProps = {
  /** From docs/content.md. */
  name: string;
  /** Already scaled to the current servings, e.g. "300 g", "1½ tbsp", "to taste". */
  amount?: string;
  /** Ingredient photo. Until real photos exist, a placeholder circle with the first letter is shown. */
  image?: ImageSourcePropType;
  /** e.g. "Milk". Shows the allergen marker. */
  allergen?: string;
  variant?: IngredientRowVariant;
  /** Only for `equipment`: which line icon to show. */
  icon?: EquipmentIcon;
};

// ─── Spoken amounts: "1½ tbsp" → "1 and a half tablespoons" ──────────────────

const UNITS: Record<string, [singular: string, plural: string]> = {
  g: ['gram', 'grams'],
  ml: ['millilitre', 'millilitres'],
  tbsp: ['tablespoon', 'tablespoons'],
  tsp: ['teaspoon', 'teaspoons'],
  piece: ['piece', 'pieces'],
  pieces: ['piece', 'pieces'],
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

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * One line in "In your box", "From your pantry" or "You'll need".
 * Name first, amount right under it. Screen readers hear one sentence: "Yoghurt, 150 grams, contains milk".
 */
export function IngredientRow({ name, amount, image, allergen, variant = 'box', icon = 'pot' }: IngredientRowProps) {
  const isEquipment = variant === 'equipment';
  const showAmount = !isEquipment && !!amount;

  const sentence = [
    name,
    showAmount ? spokenAmount(amount) : undefined,
    allergen ? `contains ${allergen.toLowerCase()}` : undefined,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <View
      accessible
      accessibilityLabel={sentence}
      style={[styles.row, isEquipment ? styles.rowEquipment : styles.rowIngredient]}
    >
      {/* Leading visual is decorative: the name already says what it is. */}
      <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        {isEquipment ? (
          <MaterialCommunityIcons
            name={EQUIPMENT_ICONS[icon]}
            size={size.icon.default}
            color={color.text.secondary}
          />
        ) : image ? (
          <Image source={image} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.placeholder]}>
            <Text style={styles.placeholderLetter}>{name.charAt(0).toUpperCase()}</Text>
          </View>
        )}
      </View>

      <View style={styles.text}>
        {/* Long names wrap to two lines; never truncated. */}
        <Text style={styles.name}>{name}</Text>
        {(showAmount || allergen) && (
          <View style={styles.amountLine}>
            {showAmount && <Text style={styles.amount}>{amount}</Text>}
            {allergen && <Tag label={allergen} variant="allergen" size="sm" />}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[3],
  },
  rowIngredient: { minHeight: size.row.ingredient },
  rowEquipment: { minHeight: size.touch.min },
  image: {
    width: size.image.ingredient,
    height: size.image.ingredient,
    borderRadius: radius.full,
  },
  placeholder: {
    backgroundColor: color.bg.subtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderLetter: {
    ...type.label,
    color: color.text.secondary,
  },
  text: {
    flex: 1,
  },
  name: {
    ...type.label,
    color: color.text.primary,
  },
  amountLine: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    columnGap: space[2],
    rowGap: space[1],
    marginTop: space[1],
  },
  amount: {
    ...type.meta,
    color: color.text.secondary,
  },
});

export default IngredientRow;
