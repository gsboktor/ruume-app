import { MutationCache, QueryCache } from '@tanstack/react-query';

export const queryCache = new QueryCache({
  onSuccess: (data) => {
    console.log('QUERY CACHE HIT', JSON.stringify(data, null, 2));
  },
  onError: (error) => {
    console.log('QUERY CACHE ERROR', JSON.stringify(error, null, 2));
  },
});
export const mutationCache = new MutationCache({
  onSuccess: (data) => {
    console.log('MUTATION CACHE SUCCESS', JSON.stringify(data, null, 2));
  },
  onError: (error) => {
    console.log('MUTATION CACHE ERROR', JSON.stringify(error, null, 2));
  },
});
