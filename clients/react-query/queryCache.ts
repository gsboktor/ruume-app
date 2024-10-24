import { MutationCache, QueryCache } from '@tanstack/react-query';

export const queryCache = new QueryCache({
  onSuccess: (data) => {
    console.log('QUERY CACHE SUCCESS', data);
  },
});
export const mutationCache = new MutationCache();
