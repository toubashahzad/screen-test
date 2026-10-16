import { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { BricolageGrotesque_700Bold } from '@expo-google-fonts/bricolage-grotesque';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { color } from '../src/theme/tokens';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // The keys become the font family names used in src/theme/tokens.ts (font.family).
  const [loaded, error] = useFonts({
    BricolageGrotesque_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  // Show nothing until the fonts are ready, so text never flashes in a system font.
  if (!loaded && !error) return null;

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: color.bg.page },
        }}
      />
    </SafeAreaProvider>
  );
}
