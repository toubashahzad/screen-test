# CLAUDE.md: rules for building this repo

You are building **one screen**: a recipe detail screen (top half), as an Expo / React Native app in
TypeScript. The point of the project is to show that **design tokens and component specs drive the UI**.
So the rules below matter more than speed or cleverness.

## Read first, in this order

1. `design-system/tokens.md`: every colour, spacing, radius, size, type style and shadow allowed.
2. `design-system/components/*.md`: the only components allowed, and exactly how each looks and behaves.
3. `docs/content.md`: the only content allowed (recipe text, ingredients, amounts, allergens, equipment).
4. `docs/analysis.md`: why the screen is ordered and designed this way. Use it to resolve intent, not styling.

`docs/screens/` contains screenshots of the **current** app. They are reference for content and context only.
Never copy their layout, colours, fonts or imagery.

## The golden rule

**Build only from tokens and components.** If something can't be built from them, stop and ask.
Don't improvise a new colour, size, component or variant.

## Hard rules

### Tokens
- All token values live in **one file**: `src/theme/tokens.ts`, mirroring `design-system/tokens.md`
  (same names, same two layers: palette, then semantic).
- Components and screens use **semantic tokens only** (`color.text.primary`), never palette tokens
  (`stone.900`) and never raw values.
- **No raw style values outside `src/theme/`:** no hex codes, no `rgb()`, no numbers for spacing, sizes,
  radius, font size, line height or shadows. The only allowed literals are `0`, `1` (hairline borders),
  `'100%'` and flex values.
- If a needed value is missing, propose a new token (name, value, reason) and wait for approval.

### Components
- Only these components exist: `Tag`, `IconButton`, `ServingStepper`, `IngredientRow`, `SectionHeader`,
  `StickyCTA`, `Button`. One file each in `src/components/`, named exactly like the spec.
- Build `Button` before `StickyCTA`: StickyCTA places a primary Button inside it.
- Each component implements **all** variants, states, props and accessibility notes from its spec, and
  nothing that isn't in the spec.
- The screen (`app/index.tsx`) only **composes** these components plus basic layout (`View`, `ScrollView`,
  `Text` with a type token, `Image`). No one-off styled elements that look like a component.
- If a spec is unclear or contradicts another file, ask. Don't guess.

### Content
- Use only `docs/content.md`, stored as data in `src/data/recipe.ts`. Never invent ingredients, amounts,
  allergens, times or copy.
- Amounts are stored for 2 servings and **calculated** from the `ServingStepper` value. Never show
  bracketed amounts like "300 ml [600 ml]".
- All UI text is in English.

### Brand and assets
- This is a concept "inspired by" HelloFresh. **No HelloFresh logo, brand colours, fonts, photos or icons.**
- Fonts: Bricolage Grotesque and Inter via `@expo-google-fonts`.
- Icons: one icon set only, `MaterialCommunityIcons` from `@expo/vector-icons`, outline style.
  Mapping: back `arrow-left` · share `share-variant-outline` · save `bookmark-outline` / saved `bookmark` ·
  shopping list `basket-outline` · allergen `alert-circle-outline` · equipment `pot-steam-outline` ·
  minus `minus` · plus `plus` · chevron `chevron-down` / `chevron-up`.
- Images: the hero photo is `assets/hero.jpg` (supplied by the designer). Until real ingredient photos exist,
  `IngredientRow` shows a placeholder: a circle in `color.bg.subtle` with the ingredient's first letter.

### Accessibility (not optional)
- Every tappable element has a tap area of at least `size.touch.min` (44).
- Every `IconButton` has an `accessibilityLabel`.
- Text scales with the phone's font-size setting; layouts must not clip at large sizes.
- Allergen information never relies on colour alone (icon + words).

## Screen order (top half)

Photo with Back / Save / Share → title, subtitle, time, difficulty → allergen row → recipe tags →
Ingredients: servings stepper, "In your box", "From your pantry", "Add to shopping list" →
"You'll need" → "About this recipe" (collapsed) → sticky "Let's cook".

## How to work

- **Plan before coding.** Before each task, list the files you'll create or change and wait for "go".
- Work in **small steps**: tokens → one component at a time → screen. Never build everything at once.
- After each step: run the type check (`npx tsc --noEmit`) and the token check (`npm run check:tokens`,
  which fails on any hex code or raw style number outside `src/theme/`). Fix failures before moving on.
- Explain changes in plain language; the designer is not a developer.
- When you make or are asked to make a design decision that isn't in the specs, log it in
  `docs/decisions.md` (date, decision, why).

## Definition of done

- [ ] The app runs in Expo Go and shows the top half in the order above.
- [ ] Changing servings updates every amount on the screen.
- [ ] `npx tsc --noEmit` and `npm run check:tokens` both pass.
- [ ] Every component matches its spec: variants, states, accessibility.
- [ ] No content that isn't in `docs/content.md`; no HelloFresh assets.
