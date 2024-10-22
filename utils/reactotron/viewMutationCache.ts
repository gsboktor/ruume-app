import Reactotron from 'reactotron-react-native';

import { mutationCache } from '@Ruume/clients/react-query';

export const viewMutationCache = () => {
  const cache = mutationCache.getAll();
  Reactotron.log(cache);
};
