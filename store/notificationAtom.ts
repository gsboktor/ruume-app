import { atom } from 'jotai';

export const notificationAtom = atom({
  default: {
    visible: false,
    message: '',
    messageContent: '',
  },
});
