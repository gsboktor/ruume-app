import type { ReactotronReactNative } from 'reactotron-react-native';
import Reactotron from 'reactotron-react-native';
import mmkvPlugin from 'reactotron-react-native-mmkv';

import { AppStorage, QueryStorage, SupabaseStorage } from '@Ruume/clients/mmkv';
import {
  clearAllCachedQueries,
  clearCurrentStorage,
  logCurrentStorage,
  unsubscribeMutationCache,
  viewMutationCache,
  viewQueryCache,
} from '@Ruume/utils/reactotron';

Reactotron.configure({
  name: 'Ruume',
  onDisconnect: () => {
    unsubscribeMutationCache();
  },
})
  .useReactNative({
    networking: {
      ignoreUrls: /symbolicate/,
    },
  })
  .use(mmkvPlugin<ReactotronReactNative>({ storage: QueryStorage }))
  .use(mmkvPlugin<ReactotronReactNative>({ storage: AppStorage }))
  .use(mmkvPlugin<ReactotronReactNative>({ storage: SupabaseStorage }))
  .connect();

Reactotron.onCustomCommand({
  title: 'Log Current Storage',
  command: 'logCurrentStorage',
  description: 'Logs the current state of all MMKV storage objects',
  handler: () => logCurrentStorage(),
});

Reactotron.onCustomCommand({
  title: 'Clear Storage',
  command: 'clearStorage',
  description: 'Clears all MMKV storage objects',
  handler: () => clearCurrentStorage(),
});

Reactotron.onCustomCommand({
  title: 'View Mutation Cache',
  command: 'viewMutationCache',
  description: 'Logs the current state of the mutation cache',
  handler: () => viewMutationCache(),
});

Reactotron.onCustomCommand({
  title: 'View Query Cache',
  command: 'viewQueryCache',
  description: 'Logs the current state of the query cache',
  handler: () => viewQueryCache(),
});

Reactotron.onCustomCommand({
  title: 'Clear All Cached Queries',
  command: 'clearAllCachedQueries',
  description: 'Clears all cached queries',
  handler: () => clearAllCachedQueries(),
});
