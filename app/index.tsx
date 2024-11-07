import React from 'react';

import { useGetSession } from '@Ruume/hooks/useGetSession';

import { Redirect } from 'expo-router';

//TODO: Create Splash Screen

export default function Index() {
  const { data: session } = useGetSession();

  return session?.user?.role === 'authenticated' ? (
    <Redirect href="/ruume-home" />
  ) : (
    <Redirect href="/ruume-landing-page" />
  );
}
