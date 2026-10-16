import { StyleSheet, Text, View } from 'react-native';
import { color, space, type } from '../theme/tokens';
import { spokenAmount } from '../data/spoken';

export type NutritionRowProps = {
  /** e.g. "Fat", "of which saturates". */
  label: string;
  /** e.g. "17 g". */
  value: string;
  /** Indented sub-row ("of which …"). */
  ofWhich?: boolean;
};

/** One line of the nutrition table: name left, value right, hairline divider below. */
export function NutritionRow({ label, value, ofWhich = false }: NutritionRowProps) {
  const spokenValue = value.split('·').map((v) => spokenAmount(v.trim())).join(', ');
  return (
    <View accessible accessibilityLabel={`${label}, ${spokenValue}`} style={styles.row}>
      <Text style={[styles.label, ofWhich && styles.labelOfWhich]}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    columnGap: space[4],
    paddingVertical: space[2],
    // Decorative divider; the layout already separates rows.
    borderBottomWidth: 1,
    borderBottomColor: color.border.default,
  },
  label: { ...type.meta, color: color.text.primary, flexShrink: 1 },
  labelOfWhich: { color: color.text.secondary, paddingLeft: space[4] },
  value: { ...type.label, color: color.text.primary, fontVariant: ['tabular-nums'] },
});

export default NutritionRow;
