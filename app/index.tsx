import { Text, View } from 'react-native';
import { color, space, type } from '../src/theme/tokens';

// Placeholder. The recipe screen is built here in step 4.
export default function RecipeScreen() {
  return (
    <View style={{ flex: 1, padding: space[4], backgroundColor: color.bg.page }}>
      <Text style={[type.title, { color: color.text.primary }]}>Recipe screen (coming in step 4)</Text>
    </View>
  );
}
