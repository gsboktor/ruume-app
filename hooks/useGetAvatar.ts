import { logger } from '@Ruume/services/logging';
import { profileService } from '@Ruume/services/profile';
import { DispatcherKeys } from '@Ruume/types/logging';

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
        logger.dispatch(DispatcherKeys.ERROR, 'useGetAvatar query failed', { error });
        throw error;
      }
    },
  });
};
