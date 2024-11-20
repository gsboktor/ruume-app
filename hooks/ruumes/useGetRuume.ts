import { useTransition } from '@Ruume/providers/TransitionsManager';
import { ruumeService } from '@Ruume/services/ruumes';
import { notificationAtom } from '@Ruume/store';

import { useGetSession } from '../auth';
import { useGetProfileById } from '../profile';

import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

export const useGetRuume = () => {
  const setNotification = useSetAtom(notificationAtom);
  const { enqueue } = useTransition();
  const { data: session } = useGetSession();

  const { data: profile } = useGetProfileById(session?.user.id);

  const profileId = profile?.id;

  return useQuery({
    queryKey: ['ruume', profileId],
    queryFn: async () => {
      try {
        if (!profileId) throw new Error('Profile id not available');
        return await ruumeService.getRuume(profileId);
      } catch (e) {
        setNotification({
          default: {
            visible: true,
            message: 'Could not get ruume!',
            messageContent: (e as Error).message,
          },
        });
        enqueue('/(auth)/ruume-sign-in-page');
      }
    },
    enabled: !!profileId,
    staleTime: Infinity,
  });
};
