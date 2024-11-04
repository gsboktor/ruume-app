import { profileService } from '@Ruume/services/profile';

import { useQuery } from '@tanstack/react-query';

export const useGetAvatar = (fileName?: string, enabled = false) => {
  return useQuery({
    queryKey: ['avatar', fileName],
    enabled: enabled,
    queryFn: async () => {
      try {
        const data = await profileService.getAvatar(fileName);
        return data;
      } catch (error) {
        console.log('Error querying for avatar:', error);
        throw error;
      }
    },
  });
};
