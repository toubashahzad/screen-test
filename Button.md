# Button

## Purpose
A text button for actions. Two variants make the hierarchy explicit:
**primary** for the one main action on a screen, **secondary** for everything else.
`StickyCTA` uses the primary Button inside it; it doesn't draw its own button.

## Anatomy
1. Container
2. Optional leading icon
3. Label

## Props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | text | — | Required. Verb first: "Let's cook", "Add to shopping list". |
| `variant` | `primary` \| `secondary` | `secondary` | See Variants. |
| `size` | `md` \| `lg` | `md` | `lg` only for the primary action in `StickyCTA`. |
| `icon` | `basket` \| none | none | Optional leading icon, 20 pt, `space.2` before the label. |
| `fullWidth` | true/false | true | Fills the available width. |
| `onPress` | action | — | Required. |

## Variants
| Variant | Look | Use |
|---|---|---|
| `primary` | `color.action.primary` fill, no border, label and icon in `color.action.onPrimary` | The single main action ("Let's cook"). **Max one per screen.** |
| `secondary` | `color.bg.surface` fill, 1 pt `color.border.control`, label and icon in `color.text.primary` | Page actions such as "Add to shopping list". |

## Sizes
| Size | Height | Label |
|---|---|---|
| `md` | 48 | `type.label` |
| `lg` | `size.cta.height` (52) | `type.label` |

Both sizes: `radius.md`, horizontal padding `space.4`, label (and icon) centred.

## States
| State | primary | secondary |
|---|---|---|
| Default | As above | As above |
| Pressed | Fill `color.action.primaryPressed` | Fill `color.bg.subtle` |
| Focused | 2 pt `color.focus` ring, 2 pt outside | Same |
| Disabled | Not used on this screen | Not used on this screen |

## Tokens
`color.action.primary` · `color.action.primaryPressed` · `color.action.onPrimary` · `color.bg.surface` ·
`color.bg.subtle` · `color.border.control` · `color.text.primary` · `color.focus` · `radius.md` · `space.2` ·
`space.4` · `size.touch.min` · `size.cta.height` · `type.label`

## Accessibility
- Role: button; the label is the accessible name. The icon is decorative.
- Both sizes exceed the 44 pt minimum tap height.

## Do
- Use `primary` once per screen; on this screen that's "Let's cook" inside `StickyCTA`.
- Place "Add to shopping list" (`secondary`, `icon="basket"`) once, directly under "From your pantry".

## Don't
- Don't use two primary buttons on one screen; the main action stops being obvious.
- Don't repeat a Button's action as an icon-only button elsewhere on the screen.
