# IconButton

## Purpose
A button with only an icon, for secondary actions that are widely recognised: Back, Share, Save.
Everything less familiar gets a text label instead (see Don't).

## Anatomy
1. Tap area (always at least 44 × 44)
2. Visible container (circle or rounded square)
3. Icon (24 pt)

## Props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `icon` | `back` \| `share` \| `save` \| `saved` | — | Required. |
| `accessibilityLabel` | text | — | **Required.** e.g. "Back", "Share recipe", "Save recipe". |
| `variant` | `onPhoto` \| `outline` | `outline` | See Variants. |
| `selected` | true/false | false | Only for toggles like Save: shows `saved` (filled) icon. |
| `onPress` | action | — | Required. |

## Variants
| Variant | Look | Use |
|---|---|---|
| `onPhoto` | Circle, 40 visible / 44 tap area, `color.overlay` fill, `color.onOverlay` icon | Over the recipe photo (Back, Share, Save), where it must stay readable on any image. |
| `outline` | Rounded square 44, `color.bg.surface` fill, 1 pt `color.border.control`, `color.text.primary` icon | On the page background. |

## States
| State | Change |
|---|---|
| Default | As above |
| Pressed | `onPhoto`: fill `color.overlayPressed`. `outline`: fill `color.bg.subtle`. |
| Selected (Save) | Filled `saved` icon; label becomes "Saved, double-tap to remove". |
| Focused | 2 pt `color.focus` ring, 2 pt outside the container. |
| Disabled | Not used on this screen. |

## Tokens
`color.bg.surface` · `color.bg.subtle` · `color.border.control` · `color.text.primary` · `color.focus` ·
`color.overlay` · `color.overlayPressed` · `color.onOverlay` ·
`radius.md` · `radius.full` · `size.touch.min`

## Accessibility
- `accessibilityLabel` is required; the component should warn in development if it's missing.
- Role: button. Save uses the selected state so screen readers say "selected".
- Tap area stays 44 × 44 even when the visible circle is smaller.

## Do
- Put Back on the left, Save and Share on the right of the photo header.

## Don't
- Don't use icon-only buttons for less familiar actions like "Add to shopping list" or Print.
  Those get a text button, or live inside the Share menu (Print).
- Don't place two icon buttons closer than `space.2` apart.
