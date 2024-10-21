import { FormType } from '@Ruume/types/forms';

import { atom } from 'jotai';

export const formTypeAtom = atom<FormType>(FormType.SIGN_UP);
