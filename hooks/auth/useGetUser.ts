import { authService } from '@Ruume/services/auth';
import { logger } from '@Ruume/services/logging';
import { DispatcherKeys } from '@Ruume/types/logging';
import { tryAsync } from '@Ruume/utils/tryAsync';

import { AuthError, User } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';

export const useGetUser = () => {
  return useQuery<User | null | undefined>({
    queryKey: ['user'],
    queryFn: async () =>
      await tryAsync<User | null, AuthError>(
        () => authService.getUser(),
        (err) => {
          logger.dispatch('useGetUser query failed', DispatcherKeys.ERROR, { error: err });
          throw err;
        },
      ),
    retry: 2,
    staleTime: Infinity,
  });
};
