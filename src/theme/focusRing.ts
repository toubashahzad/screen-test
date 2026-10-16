import type { ViewStyle } from 'react-native';
import { color, focus } from './tokens';

/**
 * Style for the 2 pt focus ring drawn `focus.offset` outside a control.
 * Render it as an absolutely positioned, non-interactive View inside the control.
 * `controlRadius` is the corner radius of the control it surrounds.
 */
export function focusRingStyle(controlRadius: number): ViewStyle {
  const outset = focus.offset + focus.width;
  return {
    position: 'absolute',
    top: -outset,
    bottom: -outset,
    left: -outset,
    right: -outset,
    borderWidth: focus.width,
    borderColor: color.focus,
    borderRadius: controlRadius + outset,
  };
}
