/**
 * Icon names shared by several components. One icon set only (CLAUDE.md):
 * MaterialCommunityIcons, outline style.
 */
export type EquipmentIcon = 'kettle' | 'pot' | 'pan' | 'bowl' | 'paper';

// The set has no frying pan; pot-mix-outline (shallow pan with spatula) is the closest.
export const EQUIPMENT_ICONS = {
  kettle: 'kettle-outline',
  pot: 'pot-steam-outline',
  pan: 'pot-mix-outline',
  bowl: 'bowl-outline',
  paper: 'paper-roll-outline',
} as const satisfies Record<EquipmentIcon, string>;

/** Icons for the recipe info items (InfoItem). */
export const INFO_ICONS = {
  time: 'clock-outline',
  difficulty: 'signal-cellular-2',
} as const;
export type InfoIcon = keyof typeof INFO_ICONS;

/** Optional leading icons for Button. */
export const BUTTON_ICONS = {
  basket: 'basket-outline',
  check: 'check-circle-outline',
  health: 'heart-pulse',
  camera: 'camera-outline',
} as const;
export type ButtonIcon = keyof typeof BUTTON_ICONS;
