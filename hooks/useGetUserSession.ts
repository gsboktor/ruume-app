import { authService } from '@Ruume/services/auth';

import { AuthError } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';

export const useGetUserSession = () => {
  return useQuery({
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
