import { useState } from 'react';
import { ScrollView, Share, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../src/components/Button';
import { IconButton } from '../src/components/IconButton';
import { IngredientRow } from '../src/components/IngredientRow';
import { SectionHeader } from '../src/components/SectionHeader';
import { ServingStepper } from '../src/components/ServingStepper';
import { StickyCTA } from '../src/components/StickyCTA';
import { Tag } from '../src/components/Tag';
import {
  BASE_SERVINGS,
  MAX_SERVINGS,
  MIN_SERVINGS,
  recipe,
  scaleAmount,
  type Ingredient,
} from '../src/data/recipe';
import { color, size, space, type } from '../src/theme/tokens';

// Out of scope for this build (docs/decisions.md): cook mode and the shopping-list sheet.
const notBuiltYet = () => {};

/**
 * Recipe detail screen, top half. Order (CLAUDE.md):
 * photo with Back / Save / Share → title, subtitle, time, difficulty → allergen row → recipe tags →
 * Ingredients: stepper, "In your box", "From your pantry", "Add to shopping list" → "You'll need" →
 * "About this recipe" (collapsed) → sticky "Let's cook".
 * "About this recipe" moved below "You'll need" on 2026-10-16 (docs/decisions.md).
 */
export default function RecipeScreen() {
  const insets = useSafeAreaInsets();
  const [servings, setServings] = useState(BASE_SERVINGS);
  const [saved, setSaved] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const goBack = () => {
    if (router.canGoBack()) router.back();
  };
  const share = async () => {
    try {
      await Share.share({ message: `${recipe.title} ${recipe.subtitle}` });
    } catch {
      // Sharing isn't available (e.g. some browsers); nothing to do.
    }
  };

  const ingredientList = (items: Ingredient[], variant: 'box' | 'pantry') => (
    <View style={{ gap: space[3] }}>
      {items.map((item) => (
        <IngredientRow
          key={item.name}
          variant={variant}
          name={item.name}
          amount={scaleAmount(item.amount, servings)}
          allergen={item.allergen}
        />
      ))}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: color.bg.page }}>
      <ScrollView contentContainerStyle={{ paddingBottom: space[12] }}>
        {/* Photo. Placeholder until the designer's assets/hero.jpg is added (docs/decisions.md). */}
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{ height: size.image.hero, backgroundColor: color.bg.subtle }}
        />

        {/* Back on the left, Save and Share on the right, over the photo. */}
        <View
          style={{
            position: 'absolute',
            top: insets.top + space[2],
            left: space[4],
            right: space[4],
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <IconButton variant="onPhoto" icon="back" accessibilityLabel="Back" onPress={goBack} />
          <View style={{ flexDirection: 'row', gap: space[2] }}>
            <IconButton
              variant="onPhoto"
              icon="save"
              accessibilityLabel="Save recipe"
              selected={saved}
              onPress={() => setSaved((s) => !s)}
            />
            <IconButton variant="onPhoto" icon="share" accessibilityLabel="Share recipe" onPress={share} />
          </View>
        </View>

        <View style={{ paddingHorizontal: space[4], paddingTop: space[4] }}>
          {/* Title, subtitle, time, difficulty */}
          <Text accessibilityRole="header" style={[type.title, { color: color.text.primary }]}>
            {recipe.title}
          </Text>
          <Text style={[type.body, { color: color.text.secondary, marginTop: space[1] }]}>{recipe.subtitle}</Text>
          <Text style={[type.meta, { color: color.text.secondary, marginTop: space[2] }]}>
            {`${recipe.totalTime} · ${recipe.difficulty}`}
          </Text>

          {/* Allergen row: always visible, icon + words, never colour alone. */}
          <View style={{ marginTop: space[6], gap: space[2] }}>
            <Tag variant="allergen" label={`Contains: ${recipe.allergens.names.join(' · ')}`} />
            <Text style={[type.caption, { color: color.text.secondary }]}>
              {`${recipe.allergens.details.join(' · ')}. ${recipe.allergens.note}`}
            </Text>
          </View>

          {/* Recipe tags */}
          <View style={{ marginTop: space[4], flexDirection: 'row', flexWrap: 'wrap', gap: space[2] }}>
            {recipe.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </View>

          {/* Ingredients */}
          <SectionHeader title="Ingredients" />
          <ServingStepper value={servings} min={MIN_SERVINGS} max={MAX_SERVINGS} onChange={setServings} />

          <SectionHeader level="group" title="In your box" meta={`${recipe.inYourBox.length} items`} />
          {ingredientList(recipe.inYourBox, 'box')}

          <SectionHeader level="group" title="From your pantry" meta={`${recipe.fromYourPantry.length} items`} />
          {ingredientList(recipe.fromYourPantry, 'pantry')}

          <View style={{ marginTop: space[6] }}>
            <Button label="Add to shopping list" icon="basket" onPress={notBuiltYet} />
          </View>

          {/* You'll need */}
          <SectionHeader title="You'll need" />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space[2] }}>
            {recipe.equipment.map((item) => (
              <Tag key={item.name} variant="equipment" label={item.name} icon={item.icon} />
            ))}
          </View>

          {/* About this recipe: collapsed by default, last so it doesn't push the ingredients down */}
          <SectionHeader
            title="About this recipe"
            collapsible
            expanded={aboutOpen}
            onToggle={() => setAboutOpen((open) => !open)}
          />
          {aboutOpen && <Text style={[type.body, { color: color.text.primary }]}>{recipe.description}</Text>}
        </View>
      </ScrollView>

      <StickyCTA onPress={notBuiltYet} />
    </View>
  );
}
