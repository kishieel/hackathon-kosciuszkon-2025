import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-reanimated';

import { CoinsProvider } from '@/app/contexts/CoinsProvider';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const migrate = async (db: SQLiteDatabase) => {
    await db.execAsync(`create table if not exists coins (id integer primary key autoincrement, name text, value integer, date text)`);
  }

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SQLiteProvider databaseName="eco.db" onInit={migrate}>
        <CoinsProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </CoinsProvider>
      </SQLiteProvider>
    </ThemeProvider>
  );
}
