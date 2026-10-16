/**
 * Design tokens. The ONLY place in the app where raw style values live.
 * Mirrors design-system/tokens.md: same names, same two layers.
 *
 *   1. palette  – raw values (paint pots). Never imported by components.
 *   2. semantic – roles (color, space, size, radius, font, type, elevation, focus).
 *                 Components and screens use only these.
 *
 * Tokens marked "Added" were approved on 2026-10-16; they are in tokens.md (marked "Added")
 * and logged in docs/decisions.md.
 */

// ─── 1. Palette ────────────────────────────────────────────────────────────────

export const palette = {
  cream: {
    50: '#FBF8F3', // warm off-white
    200: '#F2ECE2', // soft beige
  },
  white: '#FFFFFF',
  black: '#000000', // Added: base for overlays and the sticky shadow
  stone: {
    300: '#DDD5C7', // light warm grey
    500: '#8A8378', // mid warm grey
    700: '#5C574F', // dark warm grey
    900: '#1F1D1A', // warm near-black
  },
  green: {
    700: '#1D6B3B', // deep herb green
    800: '#15532D', // darker herb green
  },
  lime: {
    400: '#8DC63F', // fresh lime
  },
  amber: {
    100: '#FCEFD6', // pale amber
    300: '#E7C27D', // soft amber
    800: '#7A4300', // deep amber
  },
} as const;

/** Black at a given opacity, for overlays and shadows. */
const blackAt = (opacity: number) => `rgba(0, 0, 0, ${opacity})`;

// ─── 2. Semantic tokens ────────────────────────────────────────────────────────

export const color = {
  bg: {
    page: palette.cream[50],
    surface: palette.white,
    subtle: palette.cream[200],
  },
  text: {
    primary: palette.stone[900],
    secondary: palette.stone[700],
  },
  border: {
    default: palette.stone[300],
    control: palette.stone[500],
  },
  action: {
    primary: palette.green[700],
    primaryPressed: palette.green[800],
    onPrimary: palette.white,
  },
  accent: palette.lime[400],
  allergen: {
    bg: palette.amber[100],
    border: palette.amber[300],
    fg: palette.amber[800],
  },
  focus: palette.stone[900],
  focusOnPhoto: palette.white, // Added: focus ring on the photo, where stone.900 disappears
  overlay: blackAt(0.45),
  overlayPressed: blackAt(0.6),
  onOverlay: palette.white,
} as const;

/** 4-point spacing scale. */
export const space = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  6: 24,
  8: 32,
  12: 48,
  tagSm: 6, // Added: horizontal padding of a small Tag (spec said "space.1 + 2")
} as const;

export const size = {
  touch: { min: 44 },
  row: { ingredient: 56 },
  image: {
    ingredient: 40,
    hero: 200, // Added: hero photo height (shortened from 280 so ingredients start sooner)
  },
  cta: { height: 52 },
  button: { md: 48 }, // Added: Button md height
  tag: { md: 28, sm: 22 }, // Added: Tag heights (used as minimum heights)
  icon: {
    tagSm: 12, // Added
    tagMd: 14, // Added
    button: 20, // Added: leading icon in a Button
    default: 24, // Added: IconButton, equipment, stepper icons
  },
  iconButton: { onPhoto: 40 }, // Added: visible circle on the photo (tap area stays 44)
  stepper: { value: 56 }, // Added: width of the stepper's value area
} as const;

export const radius = {
  sm: 6,
  md: 10,
  lg: 16,
  full: 999,
} as const;

/** Added: font family names, as registered by useFonts in app/_layout.tsx. */
export const font = {
  family: {
    headingBold: 'BricolageGrotesque_700Bold',
    bodyRegular: 'Inter_400Regular',
    bodyMedium: 'Inter_500Medium',
    bodySemiBold: 'Inter_600SemiBold',
  },
} as const;

export const type = {
  title: { fontFamily: font.family.headingBold, fontSize: 26, lineHeight: 32 },
  heading: { fontFamily: font.family.headingBold, fontSize: 20, lineHeight: 26 },
  body: { fontFamily: font.family.bodyRegular, fontSize: 17, lineHeight: 24 },
  label: { fontFamily: font.family.bodySemiBold, fontSize: 15, lineHeight: 20 },
  meta: { fontFamily: font.family.bodyRegular, fontSize: 15, lineHeight: 20 },
  tag: { fontFamily: font.family.bodyMedium, fontSize: 13, lineHeight: 16 },
  caption: { fontFamily: font.family.bodyRegular, fontSize: 13, lineHeight: 18 },
} as const;

export const elevation = {
  /** shadow: 0 −2, blur 12, black at 8%. boxShadow works on iOS, Android and web. */
  sticky: { boxShadow: `0px -2px 12px ${blackAt(0.08)}` },
} as const;

/** Added: focus ring for keyboard and switch-control users. */
export const focus = {
  width: 2,
  offset: 2,
} as const;

export const tokens = { color, space, size, radius, font, type, elevation, focus } as const;
export default tokens;
