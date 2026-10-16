# Design tokens

My own "HelloFresh-inspired" tokens: a warm, kitchen-friendly look with a fresh green accent.
These are **not** HelloFresh brand values. Every value has a reason.

**Units:** sizes are in points (pt), what React Native calls plain numbers. One pt is the same
physical size on every phone, so `16` means 16 pt everywhere.

## How the tokens are organised

Two layers, so a colour can change in one place without touching components:

1. **Palette** (raw values): the paint pots, e.g. `green.700 = #1D6B3B`.
   Components never use these directly.
2. **Semantic tokens** (roles): what a value is *for*, e.g. `color.action.primary`.
   Components only use these.

If the brand green changes, only the palette changes. If "primary actions" should become a
different colour, only one semantic token changes.

## 1. Colour

### Palette

| Token | Value | |
|---|---|---|
| `cream.50` | `#FBF8F3` | warm off-white |
| `white` | `#FFFFFF` | |
| `cream.200` | `#F2ECE2` | soft beige |
| `stone.300` | `#DDD5C7` | light warm grey |
| `stone.500` | `#8A8378` | mid warm grey |
| `stone.700` | `#5C574F` | dark warm grey |
| `stone.900` | `#1F1D1A` | warm near-black |
| `green.700` | `#1D6B3B` | deep herb green |
| `green.800` | `#15532D` | darker herb green |
| `lime.400` | `#8DC63F` | fresh lime |
| `amber.100` | `#FCEFD6` | pale amber |
| `amber.300` | `#E7C27D` | soft amber |
| `amber.800` | `#7A4300` | deep amber |
| `black` | `#000000` | base for overlays and the sticky shadow (added 2026-10-16) |

### Semantic colours

Contrast ratios are measured against the page background (`#FBF8F3`) unless noted.
WCAG AA needs **4.5:1** for normal text and **3:1** for large text and control outlines.

| Token | Uses | Why |
|---|---|---|
| `color.bg.page` | `cream.50` | Warm off-white feels like kitchen paper and glares less than pure white on a bright kitchen counter. |
| `color.bg.surface` | `white` | Raised surfaces (sheets, sticky bar) separate from the page without needing heavy shadows. |
| `color.bg.subtle` | `cream.200` | Quiet fill for tags and the stepper's buttons; reads as "tappable" without shouting. |
| `color.text.primary` | `stone.900` | Titles, ingredient names, body. 15.9:1, readable at arm's length while cooking. Warm black matches the cream page. |
| `color.text.secondary` | `stone.700` | Amounts, meta, captions. 6.8:1, still well above AA so amounts never become hard to read. |
| `color.border.default` | `stone.300` | Dividers between rows. Decorative only (1.4:1), so it's never the only thing marking a control. |
| `color.border.control` | `stone.500` | Outlines of buttons and the stepper. 3.5:1 meets the 3:1 rule for control boundaries. |
| `color.action.primary` | `green.700` | The one main action ("Let's cook"). White text on it is 6.5:1. Green says "food, fresh, go". |
| `color.action.primaryPressed` | `green.800` | Pressed state, so a tap gives visible feedback. White on it is 9.1:1. |
| `color.action.onPrimary` | `white` | Text and icons on the primary button. |
| `color.accent` | `lime.400` | Small highlights such as the "New" badge. **Fill only, never text on light backgrounds** (1.9:1). Dark text on it is 8.2:1. |
| `color.allergen.bg` | `amber.100` | Allergen tag fill. Amber is distinct from the green brand and from the neutral tags, but calmer than red, because most users aren't affected. |
| `color.allergen.border` | `amber.300` | Soft outline so the allergen tag reads as different even in grayscale. |
| `color.allergen.fg` | `amber.800` | Allergen text and icon. 7.0:1 on the amber fill. Paired with an icon and the word "Contains", never colour alone. |
| `color.focus` | `stone.900` | 2 pt focus ring for keyboard and switch-control users; works on every background in this file. |
| `color.focusOnPhoto` | `white` | Focus ring on the photo's icon buttons, where `stone.900` disappears on dark images. *(Added 2026-10-16.)* |
| `color.overlay` | black at 45% | Fill behind icon buttons on the photo, so white icons stay readable on any image. |
| `color.overlayPressed` | black at 60% | Pressed state of those buttons. |
| `color.onOverlay` | `white` | Icons on the overlay. |

## 2. Spacing

A **4-point scale**: every gap is a multiple of 4, so spacing feels consistent without guessing.

| Token | Value | Why |
|---|---|---|
| `space.1` | 4 | Tight pairs: an icon and its label inside a tag. |
| `space.2` | 8 | Between a name and its amount; between tags. |
| `space.3` | 12 | Between rows inside a group. |
| `space.4` | 16 | **Screen gutter** (left/right edge) and padding inside controls. Matches common iOS and Android margins. |
| `space.6` | 24 | Between related blocks, e.g. title block → allergen row. |
| `space.8` | 32 | **Between sections** (ingredients → "You'll need"). Clearly bigger than in-section gaps, so sections read as separate. |
| `space.12` | 48 | Space at the bottom so the last content isn't hidden behind the sticky button. |
| `space.tagSm` | 6 | Horizontal padding of a small Tag (was "space.1 + 2" in the Tag spec). Off the 4-pt scale on purpose, so tiny tags don't look cramped. *(Added 2026-10-16.)* |

Size tokens:

| Token | Value | Why |
|---|---|---|
| `size.touch.min` | 44 | Minimum tap area (Apple's guideline). Every button, stepper control and tag that does something. |
| `size.row.ingredient` | 56 | Ingredient row height: fits a 40 pt photo plus two lines of text with breathing room. |
| `size.image.ingredient` | 40 | Ingredient photo; big enough to recognise, small enough to keep the list scannable. |
| `size.cta.height` | 52 | Sticky "Let's cook" button; larger than the minimum because it's the main action. |
| `size.button.md` | 48 | Standard Button height ("Add to shopping list"); comfortably above the 44 minimum. *(Added)* |
| `size.tag.md` / `size.tag.sm` | 28 / 22 | Tag heights, used as **minimum** heights so large text never clips. *(Added)* |
| `size.icon.tagMd` / `size.icon.tagSm` | 14 / 12 | Icons inside md / sm Tags; sized to the 13 pt tag text. *(Added)* |
| `size.icon.button` | 20 | Leading icon in a Button, e.g. the basket. *(Added)* |
| `size.icon.default` | 24 | IconButton, stepper, chevron and equipment icons. *(Added)* |
| `size.iconButton.onPhoto` | 40 | Visible circle of the photo's icon buttons; the tap area stays 44. *(Added)* |
| `size.stepper.value` | 56 | Width of the stepper's number area; fits "6" at large text sizes. *(Added)* |
| `size.image.hero` | 200 | Hero photo height. Short enough that the first ingredient shows on the first screen. *(Added)* |

*Tokens marked "Added" were introduced while building the screen on 2026-10-16; reasons in
[`docs/decisions.md`](../docs/decisions.md).*

## 3. Radius

| Token | Value | Why |
|---|---|---|
| `radius.sm` | 6 | Tags. Slightly soft, not pill-shaped, so they don't look like buttons. |
| `radius.md` | 10 | Buttons, stepper, icon buttons. Friendly but still structured. |
| `radius.lg` | 16 | Sheets and cards. Bigger containers get bigger curves. |
| `radius.full` | 999 | Circles: step numbers, round icon buttons on the photo. |

## 4. Typography

**Two typefaces**, both free on Google Fonts and available for Expo:

- **Bricolage Grotesque** (Bold) for headings: a bit of personality and slightly condensed, so long recipe
  titles fit on fewer lines. Not HelloFresh's font.
- **Inter** for everything else: very legible at small sizes, with tabular figures, so amounts line up.

| Token | Font | Size / line height | Use | Why |
|---|---|---|---|---|
| `type.title` | Bricolage Grotesque Bold | 26 / 32 | Recipe title | Clear hierarchy; the only text this large on the screen. |
| `type.heading` | Bricolage Grotesque Bold | 20 / 26 | Section headers ("In your box") | Easy to spot when scanning back while cooking. |
| `type.body` | Inter Regular | 17 / 24 | Subtitle, description, steps | 17 pt is the iOS default body size; comfortable reading distance. |
| `type.label` | Inter SemiBold | 15 / 20 | Ingredient names, button labels | Names should stand out from their amounts. |
| `type.meta` | Inter Regular | 15 / 20 | Amounts, time, difficulty | Same size as labels, lighter weight and secondary colour, so the pair reads as one unit. |
| `type.tag` | Inter Medium | 13 / 16 | Tags, allergen tag | Small but not tiny; 13 pt is the smallest size used. |
| `type.caption` | Inter Regular | 13 / 18 | Disclaimers | Same floor of 13 pt; nothing smaller anywhere. |

All text sizes should scale with the phone's text-size setting (Dynamic Type / font scale).

Font family names in code *(added 2026-10-16)*:

| Token | Value |
|---|---|
| `font.family.headingBold` | Bricolage Grotesque Bold (`BricolageGrotesque_700Bold`) |
| `font.family.bodyRegular` | Inter Regular (`Inter_400Regular`) |
| `font.family.bodyMedium` | Inter Medium (`Inter_500Medium`) |
| `font.family.bodySemiBold` | Inter SemiBold (`Inter_600SemiBold`) |

## 5. Elevation

| Token | Value | Why |
|---|---|---|
| `elevation.sticky` | shadow: 0 −2, blur 12, black at 8% | Only for the sticky CTA bar, to show content scrolls underneath it. Everything else stays flat. |

## 6. Focus *(added 2026-10-16)*

| Token | Value | Why |
|---|---|---|
| `focus.width` | 2 | Thickness of the focus ring. |
| `focus.offset` | 2 | Gap between a control and its focus ring, so the ring never touches the control's own border. |
