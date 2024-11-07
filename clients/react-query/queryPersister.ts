/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryStorage } from '../mmkv';

import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

const clientStorage = {
  setItem: (key: any, value: any) => {
    QueryStorage.set(key, value);
  },
  getItem: (key: any) => {
    const value = QueryStorage.getString(key);
    return value === undefined ? null : value;
  },
  removeItem: (key: any) => {
    QueryStorage.delete(key);
  },
};

export const clientPersister = createSyncStoragePersister({ storage: clientStorage });
