/* eslint-disable simpleImportSort/imports */
import React from 'react';

// import { TabBarIcon } from '@Ruume/components-example/navigation/TabBarIcon';
import { TabBar } from '@Ruume/components/tab-bar';
import { Colors } from '@Ruume/constants/Colors';
import { useColorScheme } from '@Ruume/hooks/useColorScheme';

import Home from '@Ruume/assets/icons/home.svg';
import Search from '@Ruume/assets/icons/search.svg';
import Settings from '@Ruume/assets/icons/settings.svg';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        //TODO: Remove this when we have a proper header
        header: () => <></>,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="ruume-profile"
        options={{
          tabBarIcon: ({ color }) => <Settings fill={color} width={24} height={24} />,
        }}
      />
      <Tabs.Screen
        name="ruume-home"
        options={{
          tabBarIcon: ({ color }) => <Home fill={color} width={24} height={24} />,
        }}
      />
      <Tabs.Screen
        name="ruume-search"
        options={{
          tabBarIcon: ({ color }) => <Search fill={color} width={24} height={24} />,
        }}
      />
    </Tabs>
  );
}
