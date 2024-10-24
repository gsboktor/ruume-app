import React, { useEffect } from 'react';

import { RuumeLanding } from '@Ruume/features';
import { useGetUserSession } from '@Ruume/hooks/useGetUserSession';
import { BaseText } from '@Ruume/ui';

import { router } from 'expo-router';

//TODO: Load Fonts and Create Splash Screen

export default function Index() {
  const { isPending, data: session, error } = useGetUserSession();

  useEffect(() => {
    if (!isPending && session?.user?.role === 'authenticated') {
      router.replace('/ruume-home');
      return;
    }
  }, [isPending, session?.user?.role, error]);

  if (isPending) {
    //TODO: Splash Screen Here
    return <BaseText>Loading...</BaseText>;
  }

  return <RuumeLanding />;
}
