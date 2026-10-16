import { Pressable, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { color, radius, size } from '../theme/tokens';
import { focusRingStyle } from '../theme/focusRing';
import { useFocusRing } from '../hooks/useFocusRing';

export type IconButtonIcon = 'back' | 'share' | 'save' | 'saved';
export type IconButtonVariant = 'onPhoto' | 'outline';

export type IconButtonProps = {
  icon: IconButtonIcon;
  /** Required, e.g. "Back", "Share recipe", "Save recipe". */
  accessibilityLabel: string;
  variant?: IconButtonVariant;
  /** Only for toggles like Save: shows the filled `saved` icon. */
  selected?: boolean;
  onPress: () => void;
};

// One icon set only (CLAUDE.md): MaterialCommunityIcons, outline style.
const ICONS = {
  back: 'arrow-left',
  share: 'share-variant-outline',
  save: 'bookmark-outline',
  saved: 'bookmark',
} as const;

const SAVED_LABEL = 'Saved, double-tap to remove';

/** A button with only an icon, for widely recognised actions: Back, Share, Save. */
export function IconButton({
  icon,
  accessibilityLabel,
  variant = 'outline',
  selected = false,
  onPress,
}: IconButtonProps) {
  const { focused, onFocus, onBlur } = useFocusRing();

  if (__DEV__ && !accessibilityLabel) {
    console.warn(`IconButton "${icon}" is missing an accessibilityLabel.`);
  }

  const isSaveToggle = icon === 'save' || icon === 'saved';
  const iconName = ICONS[isSaveToggle && selected ? 'saved' : icon];
  const label = isSaveToggle && selected ? SAVED_LABEL : accessibilityLabel;
  const onPhoto = variant === 'onPhoto';
  const containerRadius = onPhoto ? radius.full : radius.md;

  return (
    <Pressable
      onPress={onPress}
      onFocus={onFocus}
      onBlur={onBlur}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={isSaveToggle ? { selected } : undefined}
      // The tap area is always at least 44 × 44, even when the visible circle is 40.
      style={styles.tapArea}
    >
      {({ pressed }) => (
        <View
          style={[
            onPhoto ? styles.onPhoto : styles.outline,
            onPhoto && pressed && { backgroundColor: color.overlayPressed },
            !onPhoto && pressed && { backgroundColor: color.bg.subtle },
          ]}
        >
          <MaterialCommunityIcons
            name={iconName}
            size={size.icon.default}
            color={onPhoto ? color.onOverlay : color.text.primary}
          />
          {focused && (
            <View
              pointerEvents="none"
              style={focusRingStyle(containerRadius, onPhoto ? color.focusOnPhoto : color.focus)}
            />
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tapArea: {
    alignSelf: 'flex-start',
    minWidth: size.touch.min,
    minHeight: size.touch.min,
    alignItems: 'center',
    justifyContent: 'center',
    // The focus ring replaces the browser's default outline on web.
    outlineWidth: 0,
  },
  onPhoto: {
    width: size.iconButton.onPhoto,
    height: size.iconButton.onPhoto,
    borderRadius: radius.full,
    backgroundColor: color.overlay,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outline: {
    width: size.touch.min,
    height: size.touch.min,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: color.border.control,
    backgroundColor: color.bg.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IconButton;
