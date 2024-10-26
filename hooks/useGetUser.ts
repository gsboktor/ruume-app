import { authService } from '@Ruume/services/auth';

import { AuthError, User } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';

export const useGetUser = () => {
  return useQuery<User | null>({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const user = await authService.getUser();
        return user;
      } catch (error) {
        console.error('useGetUser query failed', error);
        throw error as AuthError;
      }
    },
    retry: 2,
    staleTime: Infinity,
  });
};
