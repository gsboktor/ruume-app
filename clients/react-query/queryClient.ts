import { mutationCache, queryCache } from './queryCache';

import { QueryClient as ReactQueryClient } from '@tanstack/react-query';

export const queryClient = new ReactQueryClient({
  mutationCache: mutationCache,
  queryCache: queryCache,
});
