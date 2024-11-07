import { DispatcherKeys } from './DispatcherKeys';

export interface Dispatcher {
  readonly dispatch: {
    [key in DispatcherKeys]: (message: string, extras?: Record<string, unknown>) => void;
  };
}
