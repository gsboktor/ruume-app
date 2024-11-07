import { supabase } from '@Ruume/clients/supabase';
import { Dispatcher } from '@Ruume/types/logging';
import { DispatcherKeys } from '@Ruume/types/logging/DispatcherKeys';

export class ConsoleDispatcher implements Dispatcher {
  constructor(private readonly defaults?: Record<string, unknown>) {}

  public readonly dispatch = {
    [DispatcherKeys.LOG]: (message: string, extras?: Record<string, unknown>) => {
      console.log(message, { ...this.defaults, ...extras });
    },
    [DispatcherKeys.WARN]: (message: string, extras?: Record<string, unknown>) => {
      console.warn(message, { ...this.defaults, ...extras });
    },
    [DispatcherKeys.ERROR]: (message: string, extras?: Record<string, unknown>) => {
      console.error(message, { ...this.defaults, ...extras });
    },
  };
}

export const consoleDispatcher = new ConsoleDispatcher({
  userId: (await supabase.auth.getSession()).data.session?.user.id,
});
