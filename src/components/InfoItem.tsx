import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { color, size, space, type } from '../theme/tokens';
import { INFO_ICONS, type InfoIcon } from '../theme/icons';
import { spokenAmount } from '../data/spoken';

export type InfoItemProps = {
  icon: InfoIcon;
  /** Small heading, e.g. "Total time", "Difficulty". */
  label: string;
  /** e.g. "40 min", "Medium". */
  value: string;
};

/** A labelled fact about the recipe: icon, small heading, value. Not interactive. */
export function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <View accessible accessibilityLabel={`${label}, ${spokenAmount(value)}`} style={styles.row}>
      <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <MaterialCommunityIcons name={INFO_ICONS[icon]} size={size.icon.default} color={color.text.secondary} />
      </View>
      <View style={styles.text}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: space[2] },
  text: { flexShrink: 1 },
  label: { ...type.caption, color: color.text.secondary },
  value: { ...type.label, color: color.text.primary },
});

export default InfoItem;
