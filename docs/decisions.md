# Design decisions

Decisions that aren't in the specs, with the reason. Newest at the bottom.

| Date | Decision | Why |
|---|---|---|
| 2026-10-16 | **New tokens** (in `src/theme/tokens.ts`, not yet in `tokens.md`): `size.button.md` 48 · `size.tag.md` 28 / `size.tag.sm` 22 · `size.icon.tagMd` 14 / `size.icon.tagSm` 12 / `size.icon.button` 20 / `size.icon.default` 24 · `size.iconButton.onPhoto` 40 · `size.stepper.value` 56 · `size.image.hero` 280 · `space.tagSm` 6 · `focus.width` 2 / `focus.offset` 2 · `font.family.*` · palette `black`. | The specs use these values but no token existed, and raw numbers aren't allowed outside `src/theme/`. Values are taken straight from the specs. The hero height (280) was missing and chosen to show the photo without pushing the title too far down. |
| 2026-10-16 | `space.tagSm` is 6 (the spec's "space.1 + 2"). | Keeps the spec's value as one named token instead of maths on a token. It is off the 4-pt scale; worth revisiting (4 would also fit). |
| 2026-10-16 | `elevation.sticky` uses `boxShadow` (`0 -2px 12px` black at 8%) instead of separate shadow props plus an Android elevation number. | One value gives the same shadow on iOS, Android and web, exactly as `tokens.md` describes it. |
| 2026-10-16 | Fixed heights in the specs (Tag 28/22, Button 48/52, stepper 44, row 56) are **minimum** heights. | Text scales with the phone's font-size setting; fixed heights would clip large text. |
| 2026-10-16 | `Button` and `Tag` get an optional `accessibilityLabel` prop. | StickyCTA needs "Let's cook, opens step-by-step cook mode" and the allergen row needs "Contains allergens: Milk, Mustard", but neither spec had a way to pass that. |
| 2026-10-16 | The allergen extras ("May contain traces of other allergens" and the product-label note) sit in a `type.caption` line under the allergen tag. | content.md has them, but no spec placed them. The tag itself stays short. |
| 2026-10-16 | "About this recipe" shows the description without "… Read more". | Collapsing the section replaces "Read more". |
| 2026-10-16 | **Scaling rules**: spoons and pieces round to the nearest ¼ (shown as ¼ ½ ¾); grams and ml round to whole numbers; units switch between singular and plural ("1 piece" / "2 pieces"); "to taste" never changes. Screen readers hear full units ("grams", "tablespoons"). | Amounts must stay readable at every serving size from 1 to 6. |
| 2026-10-16 | Actions: Save toggles on screen only; Share opens the phone's share sheet; Back, "Add to shopping list" and "Let's cook" do nothing yet. | Cook mode, the shopping-list sheet and other screens are outside the build scope. |
| 2026-10-16 | The StickyCTA hint appears in the component gallery only, not on the recipe screen. | "Step-by-step with timers" isn't in content.md, and "first time only" needs saved state the build doesn't have. |
| 2026-10-16 | All 5 equipment rows use the `pot-steam-outline` icon. | The icon mapping in CLAUDE.md has one equipment icon. |
| 2026-10-16 | Ingredient placeholder: a circle in `color.bg.subtle` with the first letter in `type.label`, `color.text.secondary`. | No photos yet; the spec didn't say how the letter looks. |
| 2026-10-16 | `check:tokens` checks style values only (`StyleSheet.create`, `style={}`, style keys, icon `size` / `hitSlop`), plus hex and `rgb()` anywhere outside `src/theme/`. | Content and maths have numbers (150 g, max 6 servings) that are not style values. |
| 2026-10-16 | Until `assets/hero.jpg` is uploaded, the photo area is a plain `color.bg.subtle` block. | No HelloFresh imagery allowed; placeholder until the designer's photo arrives. |
| 2026-10-16 | Expo SDK 58, routes in `app/` (CLAUDE.md), not `src/app/` (Expo's newer default). | CLAUDE.md names `app/index.tsx` and `app/gallery.tsx`. |
