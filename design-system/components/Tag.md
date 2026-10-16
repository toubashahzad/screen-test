# Tag

## Purpose
A small, non-interactive label that describes the recipe ("High Protein"), flags an allergen
("Contains: Milk · Mustard") or names a piece of equipment ("Kettle"). Tags inform; they are not buttons.

## Anatomy
1. Container (fill, optional border)
2. Optional leading icon
3. Text

## Props (the settings it accepts)
| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | text | — | Required. Short: 1–3 words, or "Contains: …" for allergens. |
| `variant` | `neutral` \| `allergen` \| `equipment` | `neutral` | See Variants. |
| `size` | `md` \| `sm` | `md` | `sm` is for inline use inside an IngredientRow. |
| `icon` | `kettle` \| `pot` \| `pan` \| `bowl` \| `paper` | `pot` | Only for `equipment`. Mapping in CLAUDE.md. |

## Variants
| Variant | Look | Use |
|---|---|---|
| `neutral` | `color.bg.subtle` fill, `color.text.primary` text, no icon | Recipe tags under the title. |
| `equipment` | `color.bg.subtle` fill, `color.text.primary` text, leading equipment icon in `color.text.secondary` | The "You'll need" list, as a wrapping row of chips (added 2026-10-16, see docs/decisions.md). |
| `allergen` | `color.allergen.bg` fill, 1 pt `color.allergen.border`, `color.allergen.fg` text, **warning icon** (leading) | The allergen row under the title ("Contains: Milk · Mustard") and the small marker on an ingredient ("Milk"). |

## Sizes
| Size | Height | Padding (h) | Type | Icon |
|---|---|---|---|---|
| `md` | 28 | `space.2` | `type.tag` | 14 |
| `sm` | 22 | `space.1` + 2 | `type.tag` | 12 |

## States
Static only (no pressed or focus state), because tags are not interactive.

## Tokens
`color.bg.subtle` · `color.text.primary` · `color.allergen.bg` · `color.allergen.border` ·
`color.allergen.fg` · `radius.sm` · `space.1` · `space.2` · `type.tag`

## Accessibility
- Allergen tags never rely on colour alone: they always have the icon **and** the word "Contains"
  (row) or the allergen name (marker).
- Screen readers read the allergen row as "Contains allergens: Milk, Mustard".
- Icons are decorative (`accessibilityElementsHidden`) because the text already says it.
- Equipment tags read as their name ("Kettle").

## Do
- Keep labels short; wrap tags onto a second line with `space.2` gaps.
- Use exactly one allergen row per recipe, directly under title/time/difficulty.

## Don't
- Don't make tags tappable. If a tag ever needs to filter or navigate, it becomes a different component
  with a 44 pt tap area.
- Don't show internal labels (e.g. "SEO") as tags.
- Don't use the allergen variant for anything that isn't an allergen, or it loses its meaning.
