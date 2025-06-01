import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Image source={require('../../assets/icons/home.png')} style={{height: '100%', width: '100%', tintColor: color}} resizeMode="contain"/>,
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          title: 'Quiz',
          tabBarIcon: ({ color }) => <Image source={require('../../assets/icons/quiz.png')} style={{height: '100%', width: '100%', tintColor: color}} resizeMode="contain"/>,
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ color }) => <Image source={require('../../assets/icons/event.png')} style={{height: '100%', width: '100%', tintColor: color}} resizeMode="contain"/>,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          tabBarIcon: ({ color }) => <Image source={require('../../assets/icons/thropy.png')} style={{height: '100%', width: '100%', tintColor: color}} resizeMode="contain"/>,
        }}
      />
      <Tabs.Screen
        name="educational"
        options={{
          title: 'Education',
          tabBarIcon: ({ color }) => <Image source={require('../../assets/icons/edu.png')} style={{height: '100%', width: '100%', tintColor: color}} resizeMode="contain"/>,
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: 'Shop',
          tabBarIcon: ({ color }) => <Image source={require('../../assets/icons/shop.png')} style={{height: '100%', width: '100%', tintColor: color}} resizeMode="contain"/>,
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: 'Journal',
          tabBarIcon: ({ color }) => <Image source={require('../../assets/icons/journal.png')} style={{height: '100%', width: '100%', tintColor: color}} resizeMode="contain"/>,
        }}
      />
    </Tabs>
  );
}
