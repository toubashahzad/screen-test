# StickyCTA

## Purpose
The **single** way into cook mode, always visible at the bottom of the screen. It replaces the
mid-page "Cook mode · New" banner, so there's one entry point instead of two.

StickyCTA is a **container**: it provides the sticky bar and places a `Button` inside it
(`variant="primary"`, `size="lg"`). It doesn't style its own button.

## Anatomy
1. Bar (surface, top shadow, safe-area padding)
2. Optional one-time hint above the button
3. `Button` (primary, lg)

## Props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | text | "Let's cook" | Passed to the Button. Keep to 1–3 words. |
| `hint` | text | — | One short line, e.g. "Step-by-step with timers". Shown only the first time; the screen decides. |
| `onPress` | action | — | Required. Passed to the Button; opens cook mode. |

## Layout
- Bar: `color.bg.surface`, `elevation.sticky`, padding `space.3` top, `space.4` left/right,
  bottom = `space.3` + the phone's safe area.
- Hint: `type.caption`, `color.text.secondary`, centred, `space.2` above the button.
- Button: `Button` with `variant="primary"`, `size="lg"`, full width.
- The scroll content gets `space.12` extra bottom padding so nothing hides behind the bar.

## States
The bar itself has no states. Pressed and focused states come from `Button` (primary).

## Tokens
`color.bg.surface` · `color.text.secondary` · `space.2` · `space.3` · `space.4` · `space.12` ·
`type.caption` · `elevation.sticky` (plus everything `Button` uses)

## Accessibility
- The Button's label is extended for screen readers: "Let's cook, opens step-by-step cook mode".
- Sits above the home indicator via the safe area, never under it.

## Do
- Keep this the only primary Button on the screen, so the main action is unmistakable.

## Don't
- Don't add a second cook-mode entry point (banner, card or link) elsewhere on the screen.
- Don't put secondary actions (Save, Share, shopping list) in this bar.
