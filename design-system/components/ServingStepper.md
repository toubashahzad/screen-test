# ServingStepper

## Purpose
Lets the cook choose how many servings to make. Changing it updates **every amount on the screen**:
ingredients, pantry items and (in the full concept) the steps. No more "300 ml [600 ml]".

## Anatomy
1. Label ("Servings")
2. Minus button
3. Current value
4. Plus button

## Props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `value` | number | 2 | Current servings. |
| `min` | number | 1 | Minus is disabled at this value. |
| `max` | number | 6 | Plus is disabled at this value. |
| `onChange` | action | — | Receives the new value. The screen recalculates amounts from it. |

## Layout
- Label (`type.meta`, `color.text.secondary`) above the control, `space.2` gap.
- Control: one row, total height 44. Minus and plus are 44 × 44; the value area is 56 wide.
- Outline: 1 pt `color.border.control`, `radius.md`. Minus/plus fill: `color.bg.subtle`.
- Value: `type.label`, tabular figures, centred.

## States
| State | Change |
|---|---|
| Default | As above |
| Pressed (minus/plus) | Fill darkens to `color.border.default`. |
| At min / at max | That button is disabled: icon in `color.border.control`, no press feedback. |
| Focused | 2 pt `color.focus` ring around the focused button. |

## Tokens
`color.border.control` · `color.border.default` · `color.bg.subtle` · `color.text.primary` ·
`color.text.secondary` · `color.focus` · `radius.md` · `space.2` · `size.touch.min` · `type.label` · `type.meta`

## Accessibility
- Exposed as an "adjustable" control: screen-reader users swipe up/down to change it.
- Reads as "Servings, 2". After a change it announces "4 servings".
- Minus and plus have labels "Fewer servings" / "More servings".

## Do
- Place it directly above the ingredient lists, under the "Ingredients" header.
- Recalculate amounts instantly; no "apply" button.

## Don't
- Don't show amounts for other serving sizes in brackets anywhere.
- Don't use a free text field; the stepper prevents impossible values.
