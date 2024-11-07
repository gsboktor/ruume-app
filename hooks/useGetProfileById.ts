import { queryClient } from '@Ruume/clients/react-query';
import { useTransition } from '@Ruume/providers/TransitionsManager';
import { profileService } from '@Ruume/services/profile';

import { useQuery } from '@tanstack/react-query';

export const useGetProfileById = (userId?: string) => {
  const { enqueue } = useTransition();

  return useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      try {
        const profile = await profileService.getProfileById(userId ?? '');

        if (!profile.data?.[0]?.id) {
          queryClient.invalidateQueries({ queryKey: ['session'] });
          enqueue('/(auth)/ruume-profile-setup');
        }

        return profile;
      } catch (error) {
        console.error('An error occured getting a profile by id', error);
        throw error;
      }
    },
    enabled: !!userId,
    retry: 2,
    staleTime: 3600,
  });
};
