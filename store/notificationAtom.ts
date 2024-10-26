import { NotificationType } from '@Ruume/types/store';

import { atom } from 'jotai';

export const notificationAtom = atom<{ default: NotificationType }>({
  default: {
    visible: false,
    message: '',
    messageContent: '',
  },
});
