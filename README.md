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
| `design-system/tokens.md` | Colour, spacing, radius and type tokens, each with a reason *(coming next)* |
| `design-system/components/` | One spec per component *(coming)* |
| `CLAUDE.md` | Rules Claude Code follows: build only from tokens and components *(coming)* |
| `app/` | The coded screen *(coming)* |

## Process

1. Analyse the current screen and pick a direction
2. Define tokens
3. Write component specs
4. Write the rules for Claude Code
5. Build the screen with Claude Code
6. Reflect: what the system made easy, and what it didn't
