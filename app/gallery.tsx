import type { ReactNode } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Tag } from '../src/components/Tag';
import { color, space, type } from '../src/theme/tokens';

/**
 * Component gallery: every component in every variant, size and state.
 * Open at /gallery. A development tool, not part of the recipe screen.
 */
export default function Gallery() {
  const insets = useSafeAreaInsets();

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
