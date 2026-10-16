# RecipeDetail

## Purpose
The full recipe page for one recipe, built for two moments: **unpacking the box** (what arrived, what do
I need from home) and **cooking** (amounts that match my servings, steps I can follow with busy hands).
Implemented in `app/index.tsx`, the app's home route (`/`).

Rules: only components from `design-system/components/`, only tokens from `design-system/tokens.md`,
only content from `docs/content.md` (stored in `src/data/recipe.ts`).

## Layout (top to bottom)

All content blocks sit inside a column with `space.4` padding left/right (the screen gutter),
except the photo (full width) and the sticky bar.
"Space above" is the gap between the block and the one before it. `SectionHeader` brings its own
spacing (section: `space.8` above / `space.4` below; group: `space.6` / `space.3`).

| # | Block | Build with | Data | Space above |
|---|---|---|---|---|
| 1 | Photo | `Image`, full width, height `size.image.hero`, cover, fill `color.bg.subtle` while loading | `assets/hero.jpg` | 0 |
| 2 | Header actions (over the photo) | `IconButton variant="onPhoto"`: `back` on the left; `save` (toggle) and `share` on the right, `space.2` apart | – | safe area + `space.2` from the top, `space.4` from the sides |
| 3 | Title | `Text` `type.title`, `color.text.primary`, role header | `recipe.title` | `space.4` (below the photo) |
| 4 | Subtitle | `Text` `type.meta`, `color.text.secondary` | `recipe.subtitle` | `space.1` |
| 5 | Recipe facts | Two `InfoItem`s in a wrapping row, `space.6` apart: `time` "Total time", `difficulty` "Difficulty" | `recipe.totalTime`, `recipe.difficulty` | `space.4` |
| 6 | Allergen row | `Tag variant="allergen"` "Contains: Milk (incl. lactose) · Mustard" | `recipe.allergens.rowItems` | `space.6` |
| 7 | Allergen note | `Text` `type.caption`, `color.text.secondary`: "May contain traces…" + product-label note | `recipe.allergens.mayContain`, `.note` | `space.2` |
| 8 | Recipe tags | `Tag` (neutral) in a wrapping row, `space.2` gaps | `recipe.tags` | `space.4` |
| 9 | Ingredients | `SectionHeader` "Ingredients" | – | (header) |
| 10 | Servings | `ServingStepper`, min 1, max 6, starts at 2 | – | (header) |
| 11 | In your box | `SectionHeader level="group"` "In your box", meta "9 items"; then `IngredientRow variant="box"` list, `space.3` gaps | `recipe.inYourBox` | (header) |
| 12 | From your pantry | `SectionHeader level="group"` "From your pantry", meta "4 items"; then `IngredientRow variant="pantry"` list, `space.3` gaps | `recipe.fromYourPantry` | (header) |
| 13 | Add to shopping list | `Button` secondary, `icon="basket"`, full width | – | `space.6` |
| 14 | You'll need | `SectionHeader` "You'll need"; `Tag variant="equipment"` chips in a wrapping row, `space.2` gaps | `recipe.equipment` | (header) |
| 15 | Steps | `SectionHeader` "Steps", meta "6 steps"; `Step` list, `space.6` gaps | `recipe.steps` | (header) |
| 16 | Mark as cooked | `Button` secondary, `icon="check"` | – | `space.6` |
| 17 | Nutrition | `SectionHeader` "Nutrition"; `NutritionRow` list ("of which" rows use `ofWhich`) | `recipe.nutrition` | (header) |
| 18 | Add to Health | `Button` secondary, `icon="health"` | – | `space.6` |
| 19 | My cookbook photos | `SectionHeader` "My cookbook photos" (meta "1 photo" / "N photos" once there are any); picked photos as `Image` thumbnails `size.image.cookbook`, `radius.md`, wrapping row, `space.2` gaps, `space.4` below | photos picked this session | (header) |
| 20 | Add a photo | `Button` secondary, `icon="camera"` | – | 0 (or `space.4` below the thumbnails) |
| 21 | About this recipe | `SectionHeader` "About this recipe", collapsible, **starts collapsed**; when expanded, `Text` `type.body`, `color.text.primary` | `recipe.description` | (header) |
| 22 | Sticky bar | `StickyCTA` "Let's cook", outside the scroll view, always visible | – | – |

The scroll content ends with `space.12` bottom padding so nothing hides behind the sticky bar.

## Behaviour

| Element | What happens |
|---|---|
| Servings stepper | Every amount recalculates instantly: both ingredient lists **and** the amounts inside the steps. Rules: g/ml whole numbers; tbsp/pieces to the nearest ¼; "piece"/"pieces"; "to taste" never changes; never below ¼ (or 1 g/ml). |
| Back | Goes back if there is a previous screen; otherwise nothing. |
| Save | Toggles saved / not saved on screen (filled bookmark when saved). |
| Share | iOS/Android: a menu with **Share** (the phone's share sheet), **Print** (a plain printable version of the recipe at the current servings) and **Cancel**. Browser: shares if the browser can, otherwise prints. |
| Add to shopping list | Not built yet (needs the shopping-list sheet). |
| Mark as cooked | Not built yet (needs an account). |
| Add to Health | Not built yet (needs Apple Health / Health Connect). |
| Add a photo | Opens the photo library; picked photos appear under "My cookbook photos" for this session. |
| About this recipe | Tap the header to expand / collapse. |
| Let's cook | Not built yet (opens cook mode). |

Nutrition values are shown as given and **do not** scale with servings (content.md doesn't say what
they are per).

## States
- **Default:** servings 2, About collapsed, not saved, no cookbook photos.
- **Changed servings (1–6):** all amounts update; minus disabled at 1, plus disabled at 6.
- **Saved:** filled bookmark; screen readers hear "Saved, double-tap to remove".
- **About expanded:** description shown under its header; chevron points up.
- **With cookbook photos:** thumbnails above "Add a photo", count in the header meta.
- **Photo loading or missing:** the photo area shows `color.bg.subtle`.
- **Large text:** everything grows and wraps; nothing is cut off; rows and tags use minimum heights.

## Accessibility
- Reading order follows the layout table.
- The title is a header; every `SectionHeader` is a header (collapsible ones are buttons with expanded state).
- The hero photo and cookbook thumbnails are decorative (hidden from screen readers).
- Allergens: icon + words ("Contains allergens: Milk (incl. lactose), Mustard"), never colour alone.
- Every tappable element is at least `size.touch.min` (44) high.
- The sticky button reads "Let's cook, opens step-by-step cook mode".

## Do
- Keep ingredients as early as possible: on a 390 × 844 phone the first ingredient must be visible
  on the first screen (above the sticky bar).
- Keep "In your box" and "From your pantry" as two separate lists.
- Keep exactly one primary button (Let's cook).

## Don't
- Don't show bracketed amounts ("300 ml [600 ml]") anywhere, including the steps.
- Don't add a second entry into cook mode or a second "Add to shopping list".
- Don't make Ingredients, the allergen row, "You'll need" or Steps collapsible.
- Don't add content that isn't in `docs/content.md`.

## Change log
Changes to this screen are logged in `docs/decisions.md`.
