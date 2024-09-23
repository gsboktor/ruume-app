import React from 'react';

import Home from '@Ruume/assets/icons/home.svg';
import Search from '@Ruume/assets/icons/search.svg';
import Settings from '@Ruume/assets/icons/settings.svg';
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
        //TODO: Remove this when we have a proper header
        header: () => <></>,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="ruume-profile"
        options={{
          tabBarIcon: ({ focused }) => <Settings fill={focused ? '#000' : '#2c2c2c'} width={24} height={24} />,
        }}
      />
      <Tabs.Screen
        name="ruume-home"
        options={{
          tabBarIcon: ({ focused }) => <Home fill={focused ? '#000' : '#2c2c2c'} width={24} height={24} />,
        }}
      />
      <Tabs.Screen
        name="ruume-search"
        options={{
          tabBarIcon: ({ focused }) => <Search fill={focused ? '#000' : '#2c2c2c'} width={24} height={24} />,
        }}
      />
    </Tabs>
  );
}
