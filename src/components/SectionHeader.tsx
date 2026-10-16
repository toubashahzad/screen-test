import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { color, size, space, type } from '../theme/tokens';
import { focusRingStyle } from '../theme/focusRing';
import { useFocusRing } from '../hooks/useFocusRing';

export type SectionHeaderLevel = 'section' | 'group';

export type SectionHeaderProps = {
  title: string;
  /** `section` for top-level blocks, `group` for sub-lists inside Ingredients. */
  level?: SectionHeaderLevel;
  /** Short count or hint, e.g. "9 items". */
  meta?: string;
  /** Shows a chevron and makes the whole header tappable. */
  collapsible?: boolean;
  /** Only with `collapsible`. The screen hides the content when false. */
  expanded?: boolean;
  /** Only with `collapsible`. */
  onToggle?: () => void;
};

/**
 * Names a block of content so people can find their place again while cooking.
 * Includes its own spacing above and below (section: space.8 / space.4, group: space.6 / space.3).
 */
export function SectionHeader({
  title,
  level = 'section',
  meta,
  collapsible = false,
  expanded = true,
  onToggle,
}: SectionHeaderProps) {
  const { focused, onFocus, onBlur } = useFocusRing();
  const isSection = level === 'section';

  const content = (
    <>
      <Text style={[styles.title, isSection ? type.heading : type.label]}>{title}</Text>
      {meta && <Text style={styles.meta}>{meta}</Text>}
      {collapsible && (
        <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          <MaterialCommunityIcons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={size.icon.default}
            color={color.text.primary}
          />
        </View>
      )}
    </>
  );

  return (
    // The outer View is the header (screen readers can jump between headers).
    // A collapsible header puts a button with an expanded/collapsed state inside it.
    <View
      accessibilityRole="header"
      accessible={!collapsible}
      accessibilityLabel={collapsible ? undefined : meta ? `${title}, ${meta}` : title}
      style={isSection ? styles.section : styles.group}
    >
      {collapsible ? (
        <Pressable
          onPress={onToggle}
          onFocus={onFocus}
          onBlur={onBlur}
          accessibilityRole="button"
          accessibilityLabel={meta ? `${title}, ${meta}` : title}
          accessibilityState={{ expanded }}
          aria-expanded={expanded}
          style={({ pressed }) => [styles.row, styles.tappable, pressed && styles.pressed]}
        >
          {content}
          {focused && <View pointerEvents="none" style={focusRingStyle(0)} />}
        </Pressable>
      ) : (
        <View style={styles.row}>{content}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: space[8], marginBottom: space[4] },
  group: { marginTop: space[6], marginBottom: space[3] },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[2],
  },
  tappable: {
    minHeight: size.touch.min,
    // The focus ring replaces the browser's default outline on web.
    outlineWidth: 0,
  },
  pressed: { backgroundColor: color.bg.subtle },
  title: {
    flex: 1,
    color: color.text.primary,
  },
  meta: {
    ...type.meta,
    color: color.text.secondary,
  },
});

export default SectionHeader;
