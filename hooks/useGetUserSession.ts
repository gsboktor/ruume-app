import { authService } from '@Ruume/services/auth';

import { AuthError, Session } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';

export const useGetUserSession = () => {
  return useQuery<Session | null>({
    queryKey: ['user-session'],
    queryFn: async () => {
      try {
        const session = await authService.getUserSession();
        return session;
      } catch (error) {
        console.error('Error getting user session', error);
        throw error as AuthError;
      }
    },
    retry: 2,
    staleTime: Infinity,
  });
};
