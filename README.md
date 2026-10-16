# screen-test

A concept redesign of one recipe detail screen, inspired by the HelloFresh app.
Example recipe: *Tender Chicken Breast on Zucchini Vegetables*.
Not affiliated with HelloFresh; it uses my own
"HelloFresh-inspired" design tokens, no brand assets or logo.

The goal: show how **design tokens and component specs drive AI-generated UI**.
The screen is built as real code (Expo / React Native, TypeScript) with Claude Code,
using only the tokens and components defined in this repo.

## What's inside

| Folder / file | What it is |
|---|---|
| [`docs/analysis.md`](docs/analysis.md) | Friction points (as hypotheses) and the chosen direction |
| [`docs/content.md`](docs/content.md) | The recipe content in English, used as the screen's data |
| [`docs/screens/`](docs/screens/) | The original German screens next to an English translation |
| [`design-system/tokens.md`](design-system/tokens.md) | Colour, spacing, radius, type and elevation tokens, each with a reason |
| [`design-system/components/`](design-system/components/) | One spec per component: Tag, IconButton, ServingStepper, IngredientRow, SectionHeader, StickyCTA, Button |
| [`CLAUDE.md`](CLAUDE.md) | Rules Claude Code follows: build only from tokens and components |
| `app/index.tsx` | The coded recipe screen (top half) |
| `app/gallery.tsx` | Component gallery: every component in every variant and state |
| `src/theme/tokens.ts` | All token values in code (palette, then semantic) |
| `src/components/` | The 10 components, one file each |
| `src/data/recipe.ts` | The recipe content, with amounts for 2 servings and the scaling function |
| [`docs/decisions.md`](docs/decisions.md) | Design decisions that weren't in the specs |
| `screenshots/` | Screenshots of the screen and the gallery |

## Process

1. Analyse the current screen and pick a direction
2. Define tokens
3. Write component specs
4. Write the rules for Claude Code
5. Build the screen with Claude Code
6. Reflect: what the system made easy, and what it didn't

## How to run

You need [Node.js](https://nodejs.org) (version 20 or newer).

```bash
npm install
npm start          # then scan the QR code with the Expo Go app on your phone
npm run web        # or open it in the browser
```

- The recipe screen is the home page. The component gallery is at `/gallery`
  (in the browser: `http://localhost:8081/gallery`).
- The dish photo (`assets/hero.jpg`) is a free stand-in from Wikimedia Commons, see [Credits](#credits).

Checks (both must pass before any change is merged):

```bash
npx tsc --noEmit        # type check
npm run check:tokens    # fails on any colour code or raw style number outside src/theme/
```

## Credits

Dish photo: [Parboiled rice with chicken, peppers, cucurbita, peas and tomato](https://commons.wikimedia.org/wiki/File:Parboiled_rice_with_chicken,_peppers,_cucurbita,_peas_and_tomato.jpg)
by Petar Milošević, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), via Wikimedia Commons. Details in [`assets/CREDITS.md`](assets/CREDITS.md).
