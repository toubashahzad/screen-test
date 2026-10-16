import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { color, radius, size, space, type } from '../theme/tokens';
import { EQUIPMENT_ICONS, type EquipmentIcon } from '../theme/icons';

export type TagVariant = 'neutral' | 'allergen' | 'equipment';
export type TagSize = 'md' | 'sm';

export type TagProps = {
  /** Short: 1–3 words, or "Contains: …" for allergens. */
  label: string;
  variant?: TagVariant;
  /** `sm` is for inline use inside an IngredientRow. */
  size?: TagSize;
  /** Only for `equipment`: which line icon to show. */
  icon?: EquipmentIcon;
  /**
   * What screen readers say. Defaults to the label; an allergen row label
   * "Contains: Milk · Mustard" is read as "Contains allergens: Milk, Mustard".
   */
  accessibilityLabel?: string;
};

const CONTAINS_PREFIX = 'Contains:';

function defaultAccessibilityLabel(label: string, variant: TagVariant): string {
  if (variant === 'allergen' && label.startsWith(CONTAINS_PREFIX)) {
    const allergens = label
      .slice(CONTAINS_PREFIX.length)
      .split('·')
      .map((a) => a.trim())
      .filter(Boolean);
    return `Contains allergens: ${allergens.join(', ')}`;
  }
  return label;
}

/**
 * A small, non-interactive label: a recipe tag ("High Protein"), an allergen
 * flag ("Contains: Milk · Mustard") or a piece of equipment ("Kettle"). Tags inform; they are not buttons.
 */
export function Tag({
  label,
  variant = 'neutral',
  size: tagSize = 'md',
  icon = 'pot',
  accessibilityLabel,
}: TagProps) {
  const isAllergen = variant === 'allergen';
  const iconSize = tagSize === 'md' ? size.icon.tagMd : size.icon.tagSm;

  return (
    <View
      // One element for screen readers; not a button, so no role and no press handling.
      accessible
      accessibilityLabel={accessibilityLabel ?? defaultAccessibilityLabel(label, variant)}
      style={[styles.base, sizeStyles[tagSize], variantStyles[variant]]}
    >
      {/* Icons are decorative: the text already says it. */}
      {isAllergen && (
        <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          <MaterialCommunityIcons name="alert-circle-outline" size={iconSize} color={color.allergen.fg} />
        </View>
      )}
      {variant === 'equipment' && (
        <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          <MaterialCommunityIcons name={EQUIPMENT_ICONS[icon]} size={iconSize} color={color.text.secondary} />
        </View>
      )}
      <Text style={[styles.label, { color: isAllergen ? color.allergen.fg : color.text.primary }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: space[1],
    borderRadius: radius.sm,
  },
  label: {
    ...type.tag,
    // Wrap instead of overflowing when the phone's text size is large.
    flexShrink: 1,
  },
});

// Heights are minimums so large text never clips (docs/decisions.md).
const sizeStyles = StyleSheet.create({
  md: { minHeight: size.tag.md, paddingHorizontal: space[2] },
  sm: { minHeight: size.tag.sm, paddingHorizontal: space.tagSm },
});

const variantStyles = StyleSheet.create({
  neutral: { backgroundColor: color.bg.subtle },
  equipment: { backgroundColor: color.bg.subtle },
  allergen: {
    backgroundColor: color.allergen.bg,
    borderWidth: 1,
    borderColor: color.allergen.border,
  },
});

export default Tag;
