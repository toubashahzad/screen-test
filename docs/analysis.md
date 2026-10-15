# Analysis: Recipe detail screen

A concept redesign inspired by the HelloFresh recipe detail screen, using one recipe:
**Tender Chicken Breast on Zucchini Vegetables, with basmati rice, sugar snap peas and
parsley yoghurt**. I only see the product from the outside, so everything below is a
**hypothesis to test**, not a verdict on the current design.

Reference: [`screens/`](screens/) shows the original German screens next to an English
translation, in the order of the recording (8 screens, including the shopping-list sheet
and the print dialog).

## What already works

- **Sticky "Let's cook" button**: always one tap away from cooking.
- **Serving-size stepper above the ingredients**: the right place for it.
- **Ingredient photos**: fast to scan while unpacking a box.
- **Shopping-list sheet**: lets people choose what to add instead of adding everything.

## Friction points (hypotheses)

| # | Observation | Why it might matter |
|---|---|---|
| 1 | **Ingredients come late.** The first ingredient only appears after scrolling past the first full screen; tags, three buttons, a description, allergens and a disclaimer come first. | Ingredients are what people check while unpacking and while cooking. |
| 2 | **Box and pantry items are mixed.** Salt, pepper, oil and butter sit in the same list as box items, with no amounts. In the shopping-list sheet they are **ticked by default**, so the user has to untick what they already have. | Blurs "did my box arrive complete?" with "do I have the rest at home?", and the default works against the most common case. |
| 3 | **Amounts for both serving sizes in brackets.** Steps say "300 ml [600 ml]" and "½ tbsp [1 tbsp]" even though the stepper is set to 2. | Users do the maths mid-cooking. The stepper doesn't seem to reach the steps. |
| 4 | **Equipment lives in two places that disagree.** Step 1 lists a kettle, a small pot with lid, kitchen paper, a large pan and a small bowl. The "Cooking equipment" section at the very bottom (collapsed, after nutrition) only says "Pan • Bowl". | People discover the pot and kettle too late, and the dedicated section can't be trusted. |
| 5 | **Step 1 is a wall of text.** One step covers washing, the kettle, the equipment list, cooking the rice and preparing the sugar snap peas, with two 10-minute waits but no timer. | Hard to follow with busy hands; easy to lose your place. |
| 6 | **Duplicate entry points.** Two ways into cook mode (green banner + sticky button) and two ways to the shopping list (an unlabelled basket icon + a full button). The print icon is also unlabelled, while "Save" has a label. | Duplicates make users wonder whether they do different things; icon-only buttons need guessing. |
| 7 | **Allergens read like fine print.** "Milk (incl. lactose) • Mustard" is styled like the legal disclaimer below it. | The only safety-critical information in the top half. |
| 8 | **Small polish issues.** A tag reads "SEO", which looks like an internal label. In the shopping-list sheet the "Servings" label overlaps the last list rows. Nutrition values don't say whether they are per serving. | Small things that erode trust in the content. |

## Direction: "Cook-ready top half"

New order:

> Photo → title, time, difficulty → **"Contains: Milk · Mustard" allergen row** →
> servings stepper → **In your box** / **From your pantry** → **You'll need** (equipment) → steps

Supporting changes:

- **Description** collapses into "About this recipe". **Allergens stay outside it, always visible**,
  with an icon and the word "Contains" (not colour alone), linked to the ingredients that contain
  them: "Milk" on yoghurt and butter, "Mustard" on the mustard.
- **Pantry items get amounts** worked out from the steps (oil 1½ tbsp, butter ½ tbsp for 2 servings)
  and are **unticked by default** in the shopping-list sheet.
- **"You'll need"** comes from one equipment list that the steps also use, so the two can't disagree:
  kettle, small pot with lid, large pan, small bowl, kitchen paper.
- **Cook mode** has one entry point: the sticky CTA. The banner's message (timers, translation)
  moves into the CTA or a one-time tooltip.
- **Actions:** Save moves to the header next to Share; "Add to shopping list" appears once, under the
  pantry list; Print moves into the Share menu.
- **Steps** (concept only, outside the build scope): one task per step, amounts that follow the
  serving size (no brackets), a timer chip on timed steps ("10 min").

## Build scope

The top half only: photo down to the ingredients and "You'll need".

Components: `Tag` (incl. an **allergen** variant), `IconButton`, `ServingStepper`,
`IngredientRow`, `SectionHeader`, `StickyCTA`.

## How I would test it

- **Scroll distance to the first ingredient** (before vs after).
- **5-second test:** "Which allergens does this recipe contain?"
- **Shopping list:** how many pantry items people untick today vs. how often they tick them in the new default.
- **Cook-mode start rate** with a single entry point.
- **Future hypothesis:** if users save their allergies in their profile, the allergen row escalates to a
  stronger warning only for them.
