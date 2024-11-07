import { queryClient } from '@Ruume/clients/react-query';
import { profileService } from '@Ruume/services/profile';
import { notificationAtom } from '@Ruume/store';
import { AvatarUploadType } from '@Ruume/types/services/profile';

import { StorageError } from '@supabase/storage-js';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

export const useUploadAvatar = () => {
  const setNotification = useSetAtom(notificationAtom);

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
      queryClient.invalidateQueries({ queryKey: ['avatar', data.path], type: 'all' });
    },
    onError: () => {
      setNotification({
        default: {
          visible: true,
          message: 'Error uploading avatar',
          messageContent: 'Please try again',
        },
      });
    },
    retry: 2,
  });
};
