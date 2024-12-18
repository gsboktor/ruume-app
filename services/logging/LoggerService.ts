import { Dispatcher, DispatcherKeys } from '@Ruume/types/logging';

import { consoleDispatcher } from './ConsoleDispatcher';

export class LoggerService {
  constructor(private readonly dispatcher: Dispatcher) {}

  dispatch(message: string, severity: DispatcherKeys = DispatcherKeys.LOG, extras?: Record<string, unknown>) {
    this.dispatcher.dispatch[severity](message, extras);
  }
}

//TODO: Add a dispatcher for production
export const logger = new LoggerService(__DEV__ ? consoleDispatcher : ({} as Dispatcher));
