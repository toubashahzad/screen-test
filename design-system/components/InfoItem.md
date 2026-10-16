# InfoItem

## Purpose
A labelled fact about the recipe, so people don't have to guess what "40 min" or "Medium" means.
Used for **Total time** and **Difficulty** under the title. *(Added 2026-10-16.)*

## Anatomy
1. Icon (24 pt, `color.text.secondary`)
2. Label: a small heading ("Total time")
3. Value ("40 min")

## Props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `icon` | `time` \| `difficulty` | — | Required. `clock-outline`, `signal-cellular-2`. |
| `label` | text | — | Required. Wording from content.md ("Total time", "Difficulty"). |
| `value` | text | — | Required. |

## Layout
- Row: icon, then label above value. Icon → text gap `space.2`.
- Label: `type.caption`, `color.text.secondary`. Value: `type.label`, `color.text.primary`.
- Items sit side by side with `space.6` between them and wrap if space runs out.

## States
Static.

## Tokens
`color.text.primary` · `color.text.secondary` · `space.2` · `space.6` · `size.icon.default` · `type.caption` · `type.label`

## Accessibility
- Read as one item: "Total time, 40 minutes". Units spelled out. The icon is decorative.

## Don't
- Don't make it tappable or use it for actions.
