import { authService } from '@Ruume/services/auth';

import { AuthError, Session } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';

export const useGetSession = () => {
  return useQuery<Session | null>({
    queryKey: ['session'],
    queryFn: async () => {
      try {
        const session = await authService.getSession();
        return session;
      } catch (error) {
        console.error('useGetSession query failed', error);
        throw error as AuthError;
      }
    },
    retry: 2,
    staleTime: Infinity,
    refetchOnMount: true,
  });
};
