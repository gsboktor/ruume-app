import { queryClient } from '@Ruume/clients/react-query';
import { profileService } from '@Ruume/services/profile';
import { CreateProfileRequest } from '@Ruume/types/services/profile';

import { useMutation } from '@tanstack/react-query';

export const useCreateProfile = (uid?: string) => {
  return useMutation({
    mutationKey: ['create-profile', uid],
    mutationFn: async (payload: Omit<CreateProfileRequest, 'user_id'>) => {
      try {
        if (!uid) {
          throw new Error('No uid provided');
        }
        const activeMutation = queryClient.getMutationCache().find({ mutationKey: ['create-profile', uid] });
        if (activeMutation?.state.status === 'pending') {
          return;
        }

        const profileRes = await profileService.createProfile({ ...payload, user_id: uid });
        //TODO: Create a custom error class that accepts a message, status code, and "action"
        //TODO: Add Status Code enum
        if (profileRes.status >= 400) {
          throw new Error('Response returned a non-200 code');
        }
        return profileRes.data?.[0];
      } catch (e) {
        console.log('An error occured creating a profile', e);
        throw e;
      }
    },
    retry: 1,
  });
};
