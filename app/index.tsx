import React, { useEffect } from 'react';

import { RuumeLanding } from '@Ruume/features';
import { useGetUserSession } from '@Ruume/hooks/useGetUserSession';
import { notificationAtom } from '@Ruume/store';
import { BaseText } from '@Ruume/ui';

import { router } from 'expo-router';
import { useSetAtom } from 'jotai';

//TODO: Load Fonts and Create Splash Screen

export default function Index() {
  const setNotification = useSetAtom(notificationAtom);
  const { isPending, data: session, error } = useGetUserSession();

  useEffect(() => {
    if (error) {
      setNotification({
        default: {
          visible: true,
          message: 'We could not log you in',
          messageContent: 'Try logging in again. If the issue persists, please contact us at support@ruume.com.',
        },
      });
      router.replace('/ruume-sign-in-page');
    }

    if (!isPending && session?.user?.role === 'authenticated') {
      router.replace('/ruume-home');
    }
  }, [isPending, session?.user?.role, error, setNotification]);

  if (isPending) {
    //TODO: Splash Screen Here
    return <BaseText>Loading...</BaseText>;
  }

  return <RuumeLanding />;
}
