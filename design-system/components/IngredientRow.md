# IngredientRow

## Purpose
One line in the ingredient lists ("In your box", "From your pantry") or in "You'll need".
(Since 2026-10-16 the screen shows "You'll need" as `Tag variant="equipment"` chips; the `equipment` row
variant stays available, see docs/decisions.md.)
Built for scanning while unpacking a box or cooking: name first, amount right under it.

## Anatomy
1. Leading image (ingredient photo) or icon (equipment)
2. Name
3. Amount (optional)
4. Allergen marker (optional, a small `Tag` with `variant="allergen"`, `size="sm"`)

## Props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `name` | text | — | Required. From `docs/content.md`. |
| `amount` | text | — | Already scaled to the current servings, e.g. "300 g", "1½ tbsp", "to taste". |
| `image` | image | — | Ingredient photo. Required for `box` and `pantry`. |
| `allergen` | text | — | e.g. "Milk". Shows the allergen marker. |
| `variant` | `box` \| `pantry` \| `equipment` | `box` | See Variants. |

## Variants
| Variant | Look | Use |
|---|---|---|
| `box` | 40 pt photo (`radius.full`), name + amount | Items delivered in the box. |
| `pantry` | Same as `box`; amount may be "to taste" | Salt, pepper, oil, butter: things at home. |
| `equipment` | 24 pt line icon in `color.text.secondary` instead of a photo, no amount, height 44 | "You'll need" list. |

## Layout
- Row: min height `size.row.ingredient` (56); `equipment` min height 44.
- Image → text gap: `space.3`. Rows separated by `space.3` (no dividers).
- Name: `type.label`, `color.text.primary`. Amount: `type.meta`, `color.text.secondary`, `space.1` below the name.
- Allergen marker: after the amount on the same line, `space.2` gap; wraps under it if space runs out.

## States
Static. (A tick-off "I have this" state belongs to a future shopping/cook mode, not this screen.)

## Tokens
`color.text.primary` · `color.text.secondary` · `radius.full` · `space.1` · `space.2` · `space.3` ·
`size.row.ingredient` · `size.image.ingredient` · `type.label` · `type.meta`

## Accessibility
- The row reads as one sentence: "Yoghurt, 150 grams, contains milk".
- Photos are decorative (the name says what it is).
- Amount units are spelled out for screen readers ("tbsp" → "tablespoons").

## Do
- Keep "In your box" and "From your pantry" as two separate lists, each under its own `SectionHeader`.
- Give pantry items real amounts where the steps use them (oil 1½ tbsp, butter ½ tbsp).

## Don't
- Don't mix pantry items into the box list.
- Don't invent ingredients, amounts or allergens; use only `docs/content.md`.
- Don't truncate names; let long names wrap to two lines.
