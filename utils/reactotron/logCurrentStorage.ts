
import Reactotron from 'reactotron-react-native';

import { AppStorage, QueryStorage, SupabaseStorage } from '@Ruume/clients/mmkv';

export function logCurrentStorage() {
  const tryParse = (value?: string) => {
    try {
      return JSON.parse(value ?? '{}');
    } catch (e) {
      Reactotron.log('Error parsing value: ', e);
      return value;
    }
  };

  AppStorage.getAllKeys().forEach((key) => {
    const value = AppStorage.getString(key);
    Reactotron.log(key, tryParse(value));
  });
  Reactotron.log('APP-STORAGE');


  QueryStorage.getAllKeys().forEach((key) => {
    const value = QueryStorage.getString(key);
    Reactotron.log(key, tryParse(value));
  });
  Reactotron.log('QUERY-STORAGE');


  SupabaseStorage.getAllKeys().forEach((key) => {
    const value = SupabaseStorage.getString(key);
    Reactotron.log(key, tryParse(value));
  });
  Reactotron.log('SUPABASE-STORAGE');

}
