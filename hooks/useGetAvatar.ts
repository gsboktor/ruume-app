import { profileService } from '@Ruume/services/profile';

import { useQuery } from '@tanstack/react-query';

export const useGetAvatar = (fileName?: string | null) => {
  return useQuery({
    queryKey: ['avatar', fileName],
    enabled: !!fileName,
    queryFn: async () => {
      try {
        const data = await profileService.getAvatar(fileName!);
        return data;
      } catch (error) {
        console.log('Error querying for avatar:', error);
        throw error;
      }
    },
  });
};
