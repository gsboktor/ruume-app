import React, { useContext } from 'react';

import Home from '@Ruume/assets/icons/home.svg';
import Search from '@Ruume/assets/icons/search.svg';
import Settings from '@Ruume/assets/icons/settings.svg';
import { TabBar } from '@Ruume/components/tab-bar';

import { Tabs } from 'expo-router';
import { ThemeContext } from 'styled-components/native';

export default function TabLayout() {
  const theme = useContext(ThemeContext);
  // const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  // const setFormType = useSetAtom(formTypeAtom);

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     setFormType(FormType.SIGN_IN);
  //     router.replace('/(auth)/ruume-sign-in-page');
  //   }
  // }, [isAuthenticated, setFormType]);

  return (
    <Tabs
      screenOptions={{
        //TODO: Remove this when we have a proper header
        header: () => <></>,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="ruume-profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Settings fill={focused ? theme?.tabIconSelected : theme?.tabIconDefault} width={24} height={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="ruume-home"
        options={{
          tabBarIcon: ({ focused }) => (
            <Home fill={focused ? theme?.tabIconSelected : theme?.tabIconDefault} width={24} height={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="ruume-search"
        options={{
          tabBarIcon: ({ focused }) => (
            <Search fill={focused ? theme?.tabIconSelected : theme?.tabIconDefault} width={24} height={24} />
          ),
        }}
      />
    </Tabs>
  );
}
