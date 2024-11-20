import { queryClient } from '@Ruume/clients/react-query';
import { useTransition } from '@Ruume/providers/TransitionsManager';
import { logger } from '@Ruume/services/logging';
import { profileService } from '@Ruume/services/profile';
import { DispatcherKeys } from '@Ruume/types/logging';
import { ProfileType } from '@Ruume/types/services/profile';
import { tryAsync } from '@Ruume/utils/tryAsync';

import { PostgrestError } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';

export const useGetProfileById = (userId?: string) => {
  const { enqueue } = useTransition();

  return useQuery<ProfileType | null | undefined>({
    queryKey: ['profile', userId],
    queryFn: async () =>
      await tryAsync<ProfileType | null, PostgrestError>(
        () => profileService.getProfileById(userId ?? ''),
        (err) => {
          logger.dispatch('useGetProfileById query failed', DispatcherKeys.ERROR, { error: err });
          throw err;
        },
        (data) => {
          if (!data?.id) {
            queryClient.invalidateQueries({ queryKey: ['session'] });
            enqueue('/(auth)/ruume-profile-setup');
          }
        },
      ),
    enabled: !!userId,
    retry: 2,
    staleTime: 3600,
  });
};
