import React, { createContext, ReactNode, useCallback, useContext, useEffect } from 'react';

import { queryClient } from '@Ruume/clients/react-query';
import { supabase } from '@Ruume/clients/supabase';
import { formTypeAtom } from '@Ruume/store/auth';
import { FormType } from '@Ruume/types/forms';

import { Href, router } from 'expo-router';
import { useSetAtom } from 'jotai';

export type TransitionsManagerContextType = {
  enqueueTransition: (href: Href) => void;
};

export type TransitionManagerProps = {
  children: ReactNode;
  Loader: React.FC;
};
export const TransitionsManagerContext = createContext<TransitionsManagerContextType>({
  enqueueTransition: async () => {},
});

export const TransitionsManager = ({ children }: TransitionManagerProps) => {
  const setFormType = useSetAtom(formTypeAtom);

  const enqueueTransition = useCallback((href: Href) => {
    router.push(href);
  }, []);

  useEffect(() => {
    const unsubscribe = supabase.auth.onAuthStateChange((_event) => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
      switch (_event) {
        case 'SIGNED_IN':
          enqueueTransition('/');
          break;
        case 'SIGNED_OUT':
          setFormType(FormType.SIGN_IN);
          enqueueTransition('/(auth)/ruume-sign-in-page');
          break;
        case 'TOKEN_REFRESHED':
          break;
      }
    });

    return () => unsubscribe.data.subscription.unsubscribe();
  }, [enqueueTransition, setFormType]);

  return (
    <TransitionsManagerContext.Provider value={{ enqueueTransition }}>{children}</TransitionsManagerContext.Provider>
  );
};

export const useTransition = () => {
  const { enqueueTransition } = useContext(TransitionsManagerContext);

  return { enqueue: enqueueTransition };
};
