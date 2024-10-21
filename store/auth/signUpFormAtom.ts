import { phoneNumberAtom } from './phoneNumberAtom';

import { atom } from 'jotai';

type SignUpDetails = {
  phoneNumber: string;
};

export const signUpFormAtom = atom<SignUpDetails>((get) => ({ phoneNumber: get(phoneNumberAtom) }));
