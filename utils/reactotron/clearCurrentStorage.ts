
import Reactotron from 'reactotron-react-native';

import { AppStorage, QueryStorage, SupabaseStorage } from '@Ruume/clients/mmkv';
export function clearCurrentStorage() {
  Reactotron.log('Clearing all storage');
  AppStorage.clearAll();
  QueryStorage.clearAll();
  SupabaseStorage.clearAll();
}
