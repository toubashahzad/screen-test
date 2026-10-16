import { useState } from 'react';
import { Platform, type NativeSyntheticEvent, type TargetedEvent } from 'react-native';

/**
 * Tracks whether a control should show its focus ring.
 * On web the ring only shows for keyboard focus (:focus-visible), not after a mouse click or tap.
 * On iOS/Android focus only comes from keyboards and switch control, so any focus counts.
 */
export function useFocusRing() {
  const [focused, setFocused] = useState(false);

  const onFocus = (e: NativeSyntheticEvent<TargetedEvent>) => {
    if (Platform.OS === 'web') {
      const target = e.target as unknown as { matches?: (selector: string) => boolean };
      setFocused(target.matches?.(':focus-visible') ?? true);
    } else {
      setFocused(true);
    }
  };
  const onBlur = () => setFocused(false);

  return { focused, onFocus, onBlur };
}
