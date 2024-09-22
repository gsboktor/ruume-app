/* eslint-disable simpleImportSort/imports */
import React from 'react';

import { TabBarIcon } from '@Ruume/components-example/navigation/TabBarIcon';
import { TabBar } from '@Ruume/components/tab-bar';
import { Colors } from '@Ruume/constants/Colors';
import { useColorScheme } from '@Ruume/hooks/useColorScheme';

import { Tabs } from 'expo-router';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="ruume-home"
        options={{
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ruume-profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
