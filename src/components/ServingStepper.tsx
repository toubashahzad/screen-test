import { AccessibilityInfo, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { color, radius, size, space, type } from '../theme/tokens';
import { focusRingStyle } from '../theme/focusRing';
import { useFocusRing } from '../hooks/useFocusRing';

export type ServingStepperProps = {
  /** Current servings. */
  value?: number;
  /** Minus is disabled at this value. */
  min?: number;
  /** Plus is disabled at this value. */
  max?: number;
  /** Receives the new value. The screen recalculates amounts from it. */
  onChange: (value: number) => void;
};

const servingsText = (n: number) => `${n} ${n === 1 ? 'serving' : 'servings'}`;

/**
 * Lets the cook choose how many servings to make. Changing it should update every amount on the screen.
 *
 * Screen readers get one "adjustable" control ("Servings, 2"; swipe up/down to change).
 * Keyboard, switch-control and web users can also reach the − and + buttons directly.
 */
export function ServingStepper({ value = 2, min = 1, max = 6, onChange }: ServingStepperProps) {
  const change = (next: number) => {
    const clamped = Math.min(max, Math.max(min, next));
    if (clamped === value) return;
    onChange(clamped);
    AccessibilityInfo.announceForAccessibility(servingsText(clamped));
  };

  return (
    <View
      accessible
      accessibilityRole="adjustable"
      accessibilityLabel="Servings"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={String(value)}
      accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
      onAccessibilityAction={(e) => {
        if (e.nativeEvent.actionName === 'increment') change(value + 1);
        if (e.nativeEvent.actionName === 'decrement') change(value - 1);
      }}
      style={styles.wrapper}
    >
      <Text style={styles.label}>Servings</Text>

      <View style={styles.control}>
        <StepButton
          icon="minus"
          accessibilityLabel="Fewer servings"
          disabled={value <= min}
          side="left"
          onPress={() => change(value - 1)}
        />
        <Text style={styles.value}>{value}</Text>
        <StepButton
          icon="plus"
          accessibilityLabel="More servings"
          disabled={value >= max}
          side="right"
          onPress={() => change(value + 1)}
        />
        {/* The outline is drawn on top so the control stays exactly 44 high with 44 × 44 buttons. */}
        <View pointerEvents="none" style={styles.outline} />
      </View>
    </View>
  );
}

type StepButtonProps = {
  icon: 'minus' | 'plus';
  accessibilityLabel: string;
  disabled: boolean;
  side: 'left' | 'right';
  onPress: () => void;
};

function StepButton({ icon, accessibilityLabel, disabled, side, onPress }: StepButtonProps) {
  const { focused, onFocus, onBlur } = useFocusRing();

  return (
    <Pressable
      onPress={onPress}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.button,
        side === 'left' ? styles.buttonLeft : styles.buttonRight,
        // Disabled buttons give no press feedback (Pressable never reports pressed while disabled).
        pressed && styles.buttonPressed,
      ]}
    >
      <MaterialCommunityIcons
        name={icon}
        size={size.icon.default}
        color={disabled ? color.border.control : color.text.primary}
      />
      {focused && <View pointerEvents="none" style={focusRingStyle(radius.md)} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'flex-start',
    gap: space[2],
  },
  label: {
    ...type.meta,
    color: color.text.secondary,
  },
  control: {
    flexDirection: 'row',
    alignItems: 'stretch',
    minHeight: size.touch.min,
  },
  outline: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: color.border.control,
    borderRadius: radius.md,
  },
  button: {
    width: size.touch.min,
    minHeight: size.touch.min,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.bg.subtle,
    // The focus ring replaces the browser's default outline on web.
    outlineWidth: 0,
  },
  buttonLeft: {
    borderTopLeftRadius: radius.md,
    borderBottomLeftRadius: radius.md,
  },
  buttonRight: {
    borderTopRightRadius: radius.md,
    borderBottomRightRadius: radius.md,
  },
  buttonPressed: {
    backgroundColor: color.border.default,
  },
  value: {
    ...type.label,
    color: color.text.primary,
    minWidth: size.stepper.value,
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
    // Tabular figures, so digits don't shift sideways as the value changes.
    fontVariant: ['tabular-nums'],
  },
});

export default ServingStepper;
