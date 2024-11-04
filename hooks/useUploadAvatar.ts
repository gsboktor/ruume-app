import { queryClient } from '@Ruume/clients/react-query';
import { profileService } from '@Ruume/services/profile';
import { AvatarUploadType } from '@Ruume/types/services/profile';

import { StorageError } from '@supabase/storage-js';
import { useMutation } from '@tanstack/react-query';

export const useUploadAvatar = () => {
  return useMutation({
    mutationFn: async (payload: AvatarUploadType) => {
      try {
        const data = await profileService.uploadAvatar(payload.fileName, payload.filePath, payload.ext);

        return data;
      } catch (error) {
        console.log('Error uploading avatar to bucket:', error);
        throw error as StorageError;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['avatar', data.path] });
    },
    retry: 2,
  });
};
