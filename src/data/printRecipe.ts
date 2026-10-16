import { recipe, scaleAmount, stepText } from './recipe';

const escape = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Plain HTML for printing the recipe at the chosen servings (no styling; the printer's defaults). */
export function recipeHtml(servings: number): string {
  const list = (items: { name: string; amount: Parameters<typeof scaleAmount>[0] }[]) =>
    items.map((i) => `<li>${escape(i.name)}: ${escape(scaleAmount(i.amount, servings))}</li>`).join('');

  return `<!doctype html><html><head><meta charset="utf-8"><title>${escape(recipe.title)}</title></head><body>
<h1>${escape(recipe.title)}</h1>
<p>${escape(recipe.subtitle)}</p>
<p>Total time: ${escape(recipe.totalTime)} · Difficulty: ${escape(recipe.difficulty)} · Servings: ${servings}</p>
<p>Contains: ${escape(recipe.allergens.rowItems.join(' · '))}. ${escape(recipe.allergens.mayContain)}</p>
<h2>In your box</h2><ul>${list(recipe.inYourBox)}</ul>
<h2>From your pantry</h2><ul>${list(recipe.fromYourPantry)}</ul>
<h2>You'll need</h2><ul>${recipe.equipment.map((e) => `<li>${escape(e.name)}</li>`).join('')}</ul>
<h2>Steps</h2><ol>${recipe.steps.map((s) => `<li>${escape(stepText(s, servings))}</li>`).join('')}</ol>
</body></html>`;
}
