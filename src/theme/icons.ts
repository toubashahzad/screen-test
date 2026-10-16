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
