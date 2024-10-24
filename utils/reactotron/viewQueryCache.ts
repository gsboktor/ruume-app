import Reactotron from 'reactotron-react-native';

import { queryCache } from '@Ruume/clients/react-query';

export const viewQueryCache = () => {
  const cache = queryCache.getAll();
  Reactotron.log(cache);
};
