import { storage } from '@Ruume/utils/jotai';

import { Session } from '@supabase/supabase-js';
import { atomWithStorage } from 'jotai/utils';

type GlobalSessionAtomType = Session | null;

export const globalSessionAtom = atomWithStorage<GlobalSessionAtomType>(
  'globalSessionAtom',
  null,
  storage<GlobalSessionAtomType>(),
);
