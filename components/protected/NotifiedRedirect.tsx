import React from 'react';

import { notificationAtom } from '@Ruume/store';
import { NotificationType } from '@Ruume/types/store';

import { Href, Redirect } from 'expo-router';
import { useSetAtom } from 'jotai';

type NotifiedRedirectProps = {
  href: Href;
  notificationMessage?: NotificationType;
};

export const NotifiedRedirect = ({
  href,
  notificationMessage = {
    message: 'Login again to continue.',
    messageContent: 'Please login again to continue',
    visible: true,
  },
}: NotifiedRedirectProps) => {
  const setNotification = useSetAtom(notificationAtom);

  setNotification({
    default: {
      ...notificationMessage,
    },
  });

  return <Redirect href={href} />;
};
