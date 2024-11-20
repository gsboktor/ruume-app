import { authService } from '@Ruume/services/auth';
import { logger } from '@Ruume/services/logging';
import { DispatcherKeys } from '@Ruume/types/logging';
import { tryAsync } from '@Ruume/utils/tryAsync';

import { AuthError, Session } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';

export const useGetSession = () => {
  return useQuery<Session | null | undefined>({
    queryKey: ['session'],
    queryFn: async () =>
      await tryAsync<Session | null, AuthError>(
        () => authService.getSession(),
        (err) => {
          logger.dispatch('useGetSession query failed', DispatcherKeys.ERROR, { error: err });
          throw err;
        },
      ),
    retry: 2,
    staleTime: Infinity,
    refetchOnMount: true,
  });
};
