import { ruumeService } from '@Ruume/services/ruumes';
import { notificationAtom } from '@Ruume/store';
import { CreateRuumeRequest } from '@Ruume/types/services/ruumes';

import { useGetSession } from '../auth';
import { useGetProfileById } from '../profile';

import { PostgrestError } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

export const useCreateRuume = () => {
  const setNotification = useSetAtom(notificationAtom);

  const { data: session } = useGetSession();
  const { data: profile } = useGetProfileById(session?.user.id);

  return useMutation({
    mutationKey: ['create-ruume'],
    mutationFn: (request: Omit<CreateRuumeRequest, 'owner_id'>) => {
      if (!profile?.id) throw new Error('Profile id not available');

      return ruumeService.createRuume({ ...request, owner_id: profile.id });
    },
    retry: 2,
    onSuccess: () => {},
    onError: (error: PostgrestError) => {
      setNotification({
        default: {
          visible: true,
          message: `Couldn't create ruume: ${error.code}`,
          messageContent: error.message,
        },
      });
    },
  });
};
