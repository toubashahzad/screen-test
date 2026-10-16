# NutritionRow

## Purpose
One line of the nutrition table: name on the left, value on the right. *(Added 2026-10-16.)*

## Props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | text | — | Required. "Fat", "of which saturates". |
| `value` | text | — | Required. "17 g". |
| `ofWhich` | true/false | false | Indented sub-row in `color.text.secondary`. |

## Layout
- Row, space-between; wraps the value under the label if space runs out.
- Padding `space.2` top and bottom; 1 pt `color.border.default` divider below (decorative).
- Label: `type.meta`, `color.text.primary` (`ofWhich`: `color.text.secondary`, `space.4` indent).
- Value: `type.label`, `color.text.primary`, tabular figures so numbers line up.

## States
Static.

## Tokens
`color.text.primary` · `color.text.secondary` · `color.border.default` · `space.2` · `space.4` · `type.meta` · `type.label`

## Accessibility
- Read as one item with units spelled out: "Fat, 17 grams".

## Don't
- Don't scale nutrition values with servings until content.md says what they are per.
