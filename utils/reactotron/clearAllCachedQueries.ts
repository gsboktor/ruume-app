import { queryClient } from '@Ruume/clients/react-query';

export const clearAllCachedQueries = () => {
  queryClient.clear();
};
