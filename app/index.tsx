import React, { useEffect } from 'react';

import { RuumeLanding } from '@Ruume/features';
import { useGetUserSession } from '@Ruume/hooks/useGetUserSession';

import { router } from 'expo-router';

export default function Index() {
  const { data: session, isPending: isLoadingSession, error: sessionError } = useGetUserSession();

  useEffect(() => {
    if (session && !isLoadingSession && !sessionError) {
      router.replace('/ruume-home');
      return;
    }
  }, [session, isLoadingSession, sessionError]);

  return <RuumeLanding />;
}
