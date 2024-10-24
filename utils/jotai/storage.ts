import { AppStorage } from '@Ruume/clients/mmkv';

import { createJSONStorage } from 'jotai/utils';

const getItem = (key: string): string | null => {
  return AppStorage.getString(key) ?? null;
};

const setItem = (key: string, value: string) => {
  return AppStorage.set(key, value);
};

const removeItem = (key: string) => {
  return AppStorage.delete(key);
};

const clearAll = () => {
  return AppStorage.clearAll();
};

export const appStorage = <T>() => createJSONStorage<T>(() => ({ getItem, setItem, removeItem, clearAll }));