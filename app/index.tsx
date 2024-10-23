import React, { useEffect } from 'react';

import { RuumeLanding } from '@Ruume/features';
import { isAuthenticatedAtom } from '@Ruume/store/auth/isAuthenticatedAtom';

import { router } from 'expo-router';
import { useAtomValue } from 'jotai';

export default function Index() {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  console.log('isAuthenticated from entry at index', isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/ruume-home');
    }
  }, [isAuthenticated]);

  return <RuumeLanding />;
}
