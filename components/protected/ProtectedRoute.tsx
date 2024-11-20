import React from 'react';

import { useGetSession } from '@Ruume/hooks';

import { PageLoader } from '../loaders';

import { NotifiedRedirect } from './NotifiedRedirect';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: session, isPending: loading } = useGetSession();

  if (loading) {
    return <PageLoader />;
  }

  if (!session?.user?.role || session.user.role !== 'authenticated') {
    return <NotifiedRedirect href="/ruume-sign-in-page" />;
  }

  return <>{children}</>;
};
