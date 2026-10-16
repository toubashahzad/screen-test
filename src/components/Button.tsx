import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { color, radius, size, space, type } from '../theme/tokens';
import { focusRingStyle } from '../theme/focusRing';
import { useFocusRing } from '../hooks/useFocusRing';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'md' | 'lg';
export type ButtonIcon = 'basket';

export type ButtonProps = {
  /** Verb first: "Let's cook", "Add to shopping list". */
  label: string;
  /** `primary` is for the single main action on a screen (max one). */
  variant?: ButtonVariant;
  /** `lg` only for the primary action in StickyCTA. */
  size?: ButtonSize;
  /** Optional leading icon. */
  icon?: ButtonIcon;
  /** Fills the available width. */
  fullWidth?: boolean;
  onPress: () => void;
  /** What screen readers say, if it should say more than the label. Defaults to the label. */
  accessibilityLabel?: string;
};

// One icon set only (CLAUDE.md): MaterialCommunityIcons, outline style.
const ICONS = { basket: 'basket-outline' } as const;

/** A text button. `primary` for the one main action, `secondary` for everything else. */
export function Button({
  label,
  variant = 'secondary',
  size: buttonSize = 'md',
  icon,
  fullWidth = true,
  onPress,
  accessibilityLabel,
}: ButtonProps) {
  const { focused, onFocus, onBlur } = useFocusRing();
  const isPrimary = variant === 'primary';
  const contentColor = isPrimary ? color.action.onPrimary : color.text.primary;

  return (
    <Pressable
      onPress={onPress}
      onFocus={onFocus}
      onBlur={onBlur}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      style={({ pressed }) => [
        styles.base,
        sizeStyles[buttonSize],
        isPrimary ? styles.primary : styles.secondary,
        pressed && (isPrimary ? styles.primaryPressed : styles.secondaryPressed),
        { alignSelf: fullWidth ? 'stretch' : 'flex-start' },
      ]}
    >
      {icon && (
        // Decorative: the label already says what the button does.
        <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          <MaterialCommunityIcons name={ICONS[icon]} size={size.icon.button} color={contentColor} />
        </View>
      )}
      <Text style={[styles.label, { color: contentColor }]}>{label}</Text>
      {focused && <View pointerEvents="none" style={focusRingStyle(radius.md)} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space[2],
    paddingHorizontal: space[4],
    // Breathing room if the label wraps at very large text sizes.
    paddingVertical: space[2],
    borderRadius: radius.md,
    // The focus ring replaces the browser's default outline on web.
    outlineWidth: 0,
  },
  label: {
    ...type.label,
    textAlign: 'center',
    flexShrink: 1,
  },
  primary: { backgroundColor: color.action.primary },
  primaryPressed: { backgroundColor: color.action.primaryPressed },
  secondary: {
    backgroundColor: color.bg.surface,
    borderWidth: 1,
    borderColor: color.border.control,
  },
  secondaryPressed: { backgroundColor: color.bg.subtle },
});

// Heights are minimums so large text never clips (docs/decisions.md). Both exceed size.touch.min.
const sizeStyles = StyleSheet.create({
  md: { minHeight: size.button.md },
  lg: { minHeight: size.cta.height },
});

export default Button;
