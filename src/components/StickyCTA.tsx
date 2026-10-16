import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { color, elevation, space, type } from '../theme/tokens';
import { Button } from './Button';

export type StickyCTAProps = {
  /** Passed to the Button. Keep to 1–3 words. */
  label?: string;
  /** One short line, shown only the first time; the screen decides. */
  hint?: string;
  /** Opens cook mode. */
  onPress: () => void;
};

/**
 * The single way into cook mode, always visible at the bottom of the screen.
 * A container: the sticky bar plus a primary, large Button. It doesn't style its own button.
 * Place it after the ScrollView; give the scroll content `space.12` extra bottom padding.
 */
export function StickyCTA({ label = "Let's cook", hint, onPress }: StickyCTAProps) {
  const insets = useSafeAreaInsets();

  return (
    // Bottom padding = space.3 + the phone's safe area, so the button sits above the home indicator.
    <View style={[styles.bar, { paddingBottom: space[3] + insets.bottom }]}>
      {hint && <Text style={styles.hint}>{hint}</Text>}
      <Button
        variant="primary"
        size="lg"
        label={label}
        accessibilityLabel={`${label}, opens step-by-step cook mode`}
        onPress={onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: color.bg.surface,
    paddingTop: space[3],
    paddingHorizontal: space[4],
    gap: space[2],
    ...elevation.sticky,
  },
  hint: {
    ...type.caption,
    color: color.text.secondary,
    textAlign: 'center',
  },
});

export default StickyCTA;
