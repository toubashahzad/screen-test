import { useState, type ReactNode } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../src/components/Button';
import { IconButton } from '../src/components/IconButton';
import { IngredientRow } from '../src/components/IngredientRow';
import { SectionHeader } from '../src/components/SectionHeader';
import { ServingStepper } from '../src/components/ServingStepper';
import { StickyCTA } from '../src/components/StickyCTA';
import { Tag } from '../src/components/Tag';
import { recipe } from '../src/data/recipe';
import { color, space, type } from '../src/theme/tokens';

const noop = () => {};

/**
 * Component gallery: every component in every variant, size and state.
 * Open at /gallery. A development tool, not part of the recipe screen.
 */
export default function Gallery() {
  const insets = useSafeAreaInsets();
  const [saved, setSaved] = useState(false);
  const [servings, setServings] = useState(2);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: color.bg.page }}
      contentContainerStyle={{
        paddingTop: insets.top + space[4],
        paddingBottom: insets.bottom + space[12],
        paddingHorizontal: space[4],
      }}
    >
      <Text accessibilityRole="header" style={[type.title, { color: color.text.primary }]}>
        Component gallery
      </Text>

      <Section title="Tag">
        <Example name="neutral · md">
          <Tag label="High Protein" />
        </Example>
        <Example name="neutral · sm">
          <Tag label="High Protein" size="sm" />
        </Example>
        <Example name="allergen · md (allergen row)">
          <Tag label="Contains: Milk · Mustard" variant="allergen" />
        </Example>
        <Example name="allergen · sm (ingredient marker)">
          <Tag label="Milk" variant="allergen" size="sm" />
        </Example>
        <Example name="Recipe tags, wrapping with space.2 gaps">
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space[2] }}>
            <Tag label="High Protein" />
            <Tag label="Something different" />
          </View>
        </Example>
        <Example name="equipment · md (You'll need)">
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space[2] }}>
            {recipe.equipment.map((item) => (
              <Tag key={item.name} variant="equipment" label={item.name} icon={item.icon} />
            ))}
          </View>
        </Example>
        <Example name="equipment · sm">
          <Tag variant="equipment" label="Kettle" icon="kettle" size="sm" />
        </Example>
                <Example name="Ingredient markers">
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space[2] }}>
            <Tag label="Milk" variant="allergen" size="sm" />
            <Tag label="Mustard" variant="allergen" size="sm" />
          </View>
        </Example>
      </Section>

      <Section title="IconButton">
        <Example name="onPhoto · Back, Save, Share (dark block stands in for the photo)">
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: space[4],
              backgroundColor: color.text.primary,
            }}
          >
            <IconButton variant="onPhoto" icon="back" accessibilityLabel="Back" onPress={noop} />
            <View style={{ flexDirection: 'row', gap: space[2] }}>
              <IconButton
                variant="onPhoto"
                icon="save"
                accessibilityLabel="Save recipe"
                selected={saved}
                onPress={() => setSaved((s) => !s)}
              />
              <IconButton variant="onPhoto" icon="share" accessibilityLabel="Share recipe" onPress={noop} />
            </View>
          </View>
        </Example>
        <Example name="onPhoto · Save selected">
          <View style={{ flexDirection: 'row', padding: space[4], backgroundColor: color.text.primary }}>
            <IconButton variant="onPhoto" icon="save" accessibilityLabel="Save recipe" selected onPress={noop} />
          </View>
        </Example>
        <Example name="outline · Back, Save, Share">
          <View style={{ flexDirection: 'row', gap: space[2] }}>
            <IconButton icon="back" accessibilityLabel="Back" onPress={noop} />
            <IconButton icon="save" accessibilityLabel="Save recipe" onPress={noop} />
            <IconButton icon="share" accessibilityLabel="Share recipe" onPress={noop} />
          </View>
        </Example>
        <Example name="outline · Save selected">
          <IconButton icon="save" accessibilityLabel="Save recipe" selected onPress={noop} />
        </Example>
      </Section>

      <Section title="Button">
        <Example name="primary · lg (the one main action)">
          <Button
            variant="primary"
            size="lg"
            label="Let's cook"
            accessibilityLabel="Let's cook, opens step-by-step cook mode"
            onPress={noop}
          />
        </Example>
        <Example name="primary · md">
          <Button variant="primary" label="Let's cook" onPress={noop} />
        </Example>
        <Example name="secondary · md · basket icon">
          <Button label="Add to shopping list" icon="basket" onPress={noop} />
        </Example>
        <Example name="secondary · lg">
          <Button size="lg" label="Add to shopping list" onPress={noop} />
        </Example>
        <Example name="secondary · md · fullWidth false">
          <Button label="Add to shopping list" icon="basket" fullWidth={false} onPress={noop} />
        </Example>
      </Section>

      <Section title="ServingStepper">
        <Example name="Interactive (starts at 2, range 1–6)">
          <ServingStepper value={servings} onChange={setServings} />
        </Example>
        <Example name="At min (1): minus disabled">
          <ServingStepper value={1} onChange={noop} />
        </Example>
        <Example name="At max (6): plus disabled">
          <ServingStepper value={6} onChange={noop} />
        </Example>
      </Section>

      <Section title="IngredientRow">
        <Example name="box · placeholder photo · name + amount">
          <IngredientRow name="Chicken breast" amount="2 pieces" />
        </Example>
        <Example name="box · with allergen marker">
          <IngredientRow name="Yoghurt" amount="150 g" allergen="Milk" />
        </Example>
        <Example name="box · long name with allergen marker">
          <IngredientRow name="Medium-hot mustard" amount="10 ml" allergen="Mustard" />
        </Example>
        <Example name="pantry · fraction amount with allergen marker">
          <IngredientRow variant="pantry" name="Butter" amount="½ tbsp" allergen="Milk" />
        </Example>
        <Example name="pantry · to taste">
          <IngredientRow variant="pantry" name="Salt" amount="to taste" />
        </Example>
        <Example name="equipment">
          <IngredientRow variant="equipment" name="Small pot with lid" icon="pot" />
        </Example>
        <Example name="List: rows separated by space.3, no dividers">
          <View style={{ gap: space[3] }}>
            <IngredientRow variant="pantry" name="Oil" amount="1½ tbsp" />
            <IngredientRow variant="pantry" name="Butter" amount="½ tbsp" allergen="Milk" />
            <IngredientRow variant="pantry" name="Salt" amount="to taste" />
            <IngredientRow variant="pantry" name="Pepper" amount="to taste" />
          </View>
        </Example>
      </Section>

      <Section title="SectionHeader">
        <Example name="section (includes space.8 above, space.4 below)">
          <View>
            <SectionHeader title="Ingredients" />
          </View>
        </Example>
        <Example name="group · with meta (space.6 above, space.3 below)">
          <View>
            <SectionHeader level="group" title="In your box" meta="9 items" />
          </View>
        </Example>
        <Example name="group · no meta">
          <View>
            <SectionHeader level="group" title="From your pantry" />
          </View>
        </Example>
        <Example name="section · collapsible (tap to toggle)">
          <View>
            <SectionHeader
              title="About this recipe"
              collapsible
              expanded={aboutOpen}
              onToggle={() => setAboutOpen((o) => !o)}
            />
            {aboutOpen && (
              <Text style={[type.body, { color: color.text.primary }]}>
                Today a light dish is waiting to surprise you right on time for the new year, after the last few
                days of festive feasting. Basmati rice with sugar snap peas is the side,…
              </Text>
            )}
          </View>
        </Example>
        <Example name="section · collapsible, expanded">
          <View>
            <SectionHeader title="About this recipe" collapsible expanded onToggle={noop} />
          </View>
        </Example>
      </Section>

      <Section title="StickyCTA">
        <Example name="Bar with Button (primary, lg); shown inline here, sticky on the screen">
          <StickyCTA onPress={noop} />
        </Example>
        <Example name="With one-time hint">
          <StickyCTA hint="Step-by-step with timers" onPress={noop} />
        </Example>
      </Section>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={{ marginTop: space[8], gap: space[4] }}>
      <Text accessibilityRole="header" style={[type.heading, { color: color.text.primary }]}>
        {title}
      </Text>
      {children}
    </View>
  );
}

function Example({ name, children }: { name: string; children: ReactNode }) {
  return (
    <View style={{ gap: space[2] }}>
      <Text style={[type.caption, { color: color.text.secondary }]}>{name}</Text>
      {children}
    </View>
  );
}
