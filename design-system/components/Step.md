# Step

## Purpose
One cooking step. Amounts in the text follow the servings stepper, so nobody does maths mid-cooking
("300 ml [600 ml]" never appears). *(Added 2026-10-16.)*

## Anatomy
1. Number in a circle
2. Instruction text

## Props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `number` | number | — | Required. 1, 2, 3 … |
| `text` | text | — | Required. From content.md, with amounts already scaled and kept on one line. |

## Layout
- Row, top-aligned. Number circle → text gap `space.3`.
- Circle: at least `size.step.number` (32), `radius.full`, `color.bg.subtle` fill; number in `type.label`,
  `color.text.primary`, tabular figures.
- Text: `type.body`, `color.text.primary`, wraps freely.
- Steps are separated by `space.6` (set by the list, not the step).

## States
Static. (Ticking off steps belongs to cook mode.)

## Tokens
`color.bg.subtle` · `color.text.primary` · `radius.full` · `space.3` · `space.6` · `size.step.number` ·
`type.body` · `type.label`

## Accessibility
- Read as one item: "Step 3. Press the chicken breasts…".

## Do
- Use the step wording from content.md: short, one task per step, no obvious prep (washing).

## Don't
- Don't show amounts for other serving sizes in brackets.
