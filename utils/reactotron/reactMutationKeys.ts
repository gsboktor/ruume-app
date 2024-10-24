import Reactotron from 'reactotron-react-native';

import { mutationCache } from '@Ruume/clients/react-query';

import { MutationCacheNotifyEvent } from '@tanstack/react-query';

const cacheCallback = (event: MutationCacheNotifyEvent) => {
  Reactotron.log('IN CACHE CALLBACK', event);
};

const unsubscribeMutationCache = mutationCache.subscribe(cacheCallback);

export { unsubscribeMutationCache };
