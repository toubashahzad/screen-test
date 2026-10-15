# StickyCTA

## Purpose
The **single** way into cook mode, always visible at the bottom of the screen. It replaces the
mid-page "Cook mode · New" banner, so there's one entry point instead of two.

## Anatomy
1. Bar (surface, top shadow, safe-area padding)
2. Optional one-time hint above the button
3. Primary button with label

## Props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | text | "Let's cook" | Keep to 1–3 words. |
| `hint` | text | — | One short line, e.g. "Step-by-step with timers". Shown only the first time; the screen decides. |
| `onPress` | action | — | Required. Opens cook mode. |

## Layout
- Bar: `color.bg.surface`, `elevation.sticky`, padding `space.3` top, `space.4` left/right, bottom = `space.3` + phone's safe area.
- Hint: `type.caption`, `color.text.secondary`, centred, `space.2` above the button.
- Button: full width, height `size.cta.height` (52), `radius.md`, `color.action.primary` fill,
  label `type.label` in `color.action.onPrimary`, centred.
- The scroll content gets `space.12` extra bottom padding so nothing hides behind the bar.

## States
| State | Change |
|---|---|
| Default | As above |
| Pressed | Fill `color.action.primaryPressed`. |
| Focused | 2 pt `color.focus` ring, 2 pt outside the button. |
| Disabled | Not used. |

## Tokens
`color.bg.surface` · `color.action.primary` · `color.action.primaryPressed` · `color.action.onPrimary` ·
`color.text.secondary` · `color.focus` · `radius.md` · `space.2` · `space.3` · `space.4` · `space.12` ·
`size.cta.height` · `type.label` · `type.caption` · `elevation.sticky`

## Accessibility
- Role: button; label "Let's cook, opens step-by-step cook mode".
- Sits above the home indicator via the safe area, never under it.

## Do
- Keep it the only green filled button on the screen, so the main action is unmistakable.

## Don't
- Don't add a second cook-mode entry point (banner, card or link) elsewhere on the screen.
- Don't put secondary actions (Save, Share, shopping list) in this bar.
