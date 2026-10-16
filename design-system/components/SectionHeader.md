# SectionHeader

## Purpose
Names a block of content so people can find their place again while cooking:
"Ingredients", "In your box", "From your pantry", "You'll need", "About this recipe".

## Anatomy
1. Title
2. Optional meta (e.g. "9 items")
3. Optional chevron (only when the section can collapse)

## Props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `title` | text | — | Required. |
| `level` | `section` \| `group` | `section` | See Variants. |
| `meta` | text | — | Short count or hint, e.g. "9 items". |
| `collapsible` | true/false | false | Shows a chevron and makes the whole header tappable. |
| `expanded` | true/false | true | Only with `collapsible`. |
| `onToggle` | action | — | Only with `collapsible`. |

## Variants
| Variant | Look | Use |
|---|---|---|
| `section` | `type.heading`, `color.text.primary`; `space.8` above, `space.4` below | Top-level blocks: "Ingredients", "You'll need", "About this recipe". |
| `group` | `type.label`, `color.text.primary`, meta in `type.meta` / `color.text.secondary`; `space.6` above, `space.3` below | Sub-lists inside Ingredients: "In your box", "From your pantry". |

## States (collapsible only)
| State | Change |
|---|---|
| Expanded | Chevron points up. |
| Collapsed | Chevron points down; content hidden. |
| Pressed | Background `color.bg.subtle` behind the full-width row. |
| Focused | 2 pt `color.focus` ring around the row. |

## Tokens
`color.text.primary` · `color.text.secondary` · `color.bg.subtle` · `color.focus` · `space.3` · `space.4` ·
`space.6` · `space.8` · `size.touch.min` · `type.heading` · `type.label` · `type.meta`

## Accessibility
- Marked as a header, so screen-reader users can jump between sections.
- Collapsible headers are buttons with an "expanded / collapsed" state; tap area is the full row, at least 44 high.

## Do
- Only "Nutrition" and "About this recipe" are collapsible on this screen, and both start collapsed.

## Don't
- Don't make Ingredients, the allergen row or "You'll need" collapsible: they're the point of the screen.
- Don't put the chevron on non-collapsible headers.
