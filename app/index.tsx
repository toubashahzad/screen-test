import { useState } from 'react';
import { Alert, Image, Platform, ScrollView, Share, Text, View } from 'react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as Print from 'expo-print';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../src/components/Button';
import { IconButton } from '../src/components/IconButton';
import { InfoItem } from '../src/components/InfoItem';
import { IngredientRow } from '../src/components/IngredientRow';
import { NutritionRow } from '../src/components/NutritionRow';
import { SectionHeader } from '../src/components/SectionHeader';
import { ServingStepper } from '../src/components/ServingStepper';
import { Step } from '../src/components/Step';
import { StickyCTA } from '../src/components/StickyCTA';
import { Tag } from '../src/components/Tag';
import { recipeHtml } from '../src/data/printRecipe';
import {
  BASE_SERVINGS,
  MAX_SERVINGS,
  MIN_SERVINGS,
  recipe,
  scaleAmount,
  stepText,
  type Ingredient,
} from '../src/data/recipe';
import { color, radius, size, space, type } from '../src/theme/tokens';

// Need screens or services this prototype doesn't have (docs/decisions.md):
// cook mode, the shopping-list sheet, marking as cooked (an account), Apple Health / Health Connect.
const notBuiltYet = () => {};

/**
 * Recipe detail screen. Order (CLAUDE.md):
 * photo with Back / Save / Share → title, subtitle → total time, difficulty → allergen row → recipe tags →
 * Ingredients → "You'll need" → Steps → Mark as cooked → Nutrition (collapsed, with Add to Health) →
 * My cookbook photos → "About this recipe" (collapsed) → sticky "Let's cook".
 */
export default function RecipeScreen() {
  const insets = useSafeAreaInsets();
  const [servings, setServings] = useState(BASE_SERVINGS);
  const [saved, setSaved] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [nutritionOpen, setNutritionOpen] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);

  const goBack = () => {
    if (router.canGoBack()) router.back();
  };

  const shareText = async () => {
    try {
      await Share.share({ message: `${recipe.title} ${recipe.subtitle}` });
    } catch {
      // Sharing isn't available; nothing to do.
    }
  };
  const print = async () => {
    try {
      await Print.printAsync({ html: recipeHtml(servings) });
    } catch {
      // Printing was cancelled or isn't available.
    }
  };
  // Print lives inside the Share menu (analysis.md), not as its own icon.
  const openShareMenu = () => {
    if (Platform.OS === 'web') {
      // Browsers have no native action sheet: share where the browser can, otherwise print.
      const canShare = typeof navigator !== 'undefined' && 'share' in navigator;
      if (canShare) shareText();
      else print();
      return;
    }
    Alert.alert(recipe.title, undefined, [
      { text: 'Share', onPress: shareText },
      { text: 'Print', onPress: print },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const addPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.7 });
    if (!result.canceled) setPhotos((p) => [...p, ...result.assets.map((a) => a.uri)]);
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
        {/* Photo: decorative (the title says what the dish is). Credits in assets/CREDITS.md. */}
        <Image
          source={require('../assets/hero.jpg')}
          resizeMode="cover"
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{ width: '100%', height: size.image.hero, backgroundColor: color.bg.subtle }}
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
            <IconButton variant="onPhoto" icon="share" accessibilityLabel="Share recipe" onPress={openShareMenu} />
          </View>
        </View>

        <View style={{ paddingHorizontal: space[4], paddingTop: space[4] }}>
          {/* Title and subtitle */}
          <Text accessibilityRole="header" style={[type.title, { color: color.text.primary }]}>
            {recipe.title}
          </Text>
          <Text style={[type.meta, { color: color.text.secondary, marginTop: space[1] }]}>{recipe.subtitle}</Text>

          {/* Total time and difficulty, each with its own small heading */}
          <View style={{ marginTop: space[4], flexDirection: 'row', flexWrap: 'wrap', gap: space[6] }}>
            <InfoItem icon="time" label="Total time" value={recipe.totalTime} />
            <InfoItem icon="difficulty" label="Difficulty" value={recipe.difficulty} />
          </View>

          {/* Allergen row: always visible, icon + words, never colour alone. Each fact appears once. */}
          <View style={{ marginTop: space[6], gap: space[2] }}>
            <Tag variant="allergen" label={`Contains: ${recipe.allergens.rowItems.join(' · ')}`} />
            <Text style={[type.caption, { color: color.text.secondary }]}>
              {`${recipe.allergens.mayContain} ${recipe.allergens.note}`}
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

          {/* Steps: amounts follow the servings stepper, no brackets */}
          <SectionHeader title="Steps" meta={`${recipe.steps.length} steps`} />
          <View style={{ gap: space[6] }}>
            {recipe.steps.map((parts, i) => (
              <Step key={i} number={i + 1} text={stepText(parts, servings)} />
            ))}
          </View>
          <View style={{ marginTop: space[6] }}>
            <Button label="Mark as cooked" icon="check" onPress={notBuiltYet} />
          </View>

          {/* Nutrition: collapsed by default; "Add to Health" belongs to it */}
          <SectionHeader
            title="Nutrition"
            meta={recipe.nutritionSummary}
            collapsible
            expanded={nutritionOpen}
            onToggle={() => setNutritionOpen((open) => !open)}
          />
          {nutritionOpen && (
            <>
              <View>
                {recipe.nutrition.map((n) => (
                  <NutritionRow key={n.label} label={n.label} value={n.value} ofWhich={n.ofWhich} />
                ))}
              </View>
              <View style={{ marginTop: space[6] }}>
                <Button label="Add to Health" icon="health" onPress={notBuiltYet} />
              </View>
            </>
          )}

          {/* My cookbook photos */}
          <SectionHeader
            title="My cookbook photos"
            meta={photos.length ? `${photos.length} ${photos.length === 1 ? 'photo' : 'photos'}` : undefined}
          />
          {photos.length > 0 && (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space[2], marginBottom: space[4] }}>
              {photos.map((uri) => (
                <Image
                  key={uri}
                  source={{ uri }}
                  accessibilityElementsHidden
                  importantForAccessibility="no-hide-descendants"
                  style={{ width: size.image.cookbook, height: size.image.cookbook, borderRadius: radius.md }}
                />
              ))}
            </View>
          )}
          <Button label="Add a photo" icon="camera" onPress={addPhoto} />

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
