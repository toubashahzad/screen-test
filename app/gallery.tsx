import { useState, type ReactNode } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../src/components/Button';
import { IconButton } from '../src/components/IconButton';
import { Tag } from '../src/components/Tag';
import { color, space, type } from '../src/theme/tokens';

const noop = () => {};

/**
 * Component gallery: every component in every variant, size and state.
 * Open at /gallery. A development tool, not part of the recipe screen.
 */
export default function Gallery() {
  const insets = useSafeAreaInsets();
  const [saved, setSaved] = useState(false);

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
