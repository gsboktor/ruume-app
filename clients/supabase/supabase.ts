/* eslint-disable simpleImportSort/imports */
import 'react-native-url-polyfill/auto';

import { Database } from '@Ruume/database.types';
import { createClient, SupportedStorage } from '@supabase/supabase-js';
import { SupabaseStorage } from '../mmkv';

const mmkvSupabaseSupportedStorage = {
  setItem: (key, data) => SupabaseStorage.set(key, data),
  getItem: (key) => SupabaseStorage.getString(key) ?? null,
  removeItem: (key) => SupabaseStorage.delete(key),
} satisfies SupportedStorage;

export const supabase = createClient<Database>(
  process.env.EXPO_PUBLIC_SUPABASE_URL ?? '',
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '',
  {
    auth: {
      storage: mmkvSupabaseSupportedStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);
