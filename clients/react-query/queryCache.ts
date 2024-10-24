import { MutationCache, QueryCache } from '@tanstack/react-query';

export const queryCache = new QueryCache({
  onSuccess: (data) => {
    console.log('QUERY CACHE SUCCESS', JSON.stringify(data, null, 2));
  },
});
export const mutationCache = new MutationCache({
  onSuccess: (data) => {
    console.log('MUTATION CACHE SUCCESS', JSON.stringify(data, null, 2));
  },
});
