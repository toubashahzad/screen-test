import { StyleSheet, Text, View } from 'react-native';
import { color, radius, size, space, type } from '../theme/tokens';

export type StepProps = {
  /** 1, 2, 3 … */
  number: number;
  /** The step text, with amounts already scaled to the current servings. */
  text: string;
};

/** One cooking step: a numbered circle and the instruction. Not interactive. */
export function Step({ number, text }: StepProps) {
  return (
    <View accessible accessibilityLabel={`Step ${number}. ${text}`} style={styles.row}>
      <View style={styles.circle}>
        <Text style={styles.number}>{number}</Text>
      </View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: space[3] },
  circle: {
    minWidth: size.step.number,
    minHeight: size.step.number,
    borderRadius: radius.full,
    backgroundColor: color.bg.subtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: { ...type.label, color: color.text.primary, fontVariant: ['tabular-nums'] },
  text: { ...type.body, color: color.text.primary, flex: 1 },
});

export default Step;
