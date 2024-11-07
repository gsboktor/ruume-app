import DeviceInfo from 'react-native-device-info';

import { Dispatcher, DispatcherKeys } from '@Ruume/types/logging';

export class ConsoleDispatcher implements Dispatcher {
  private _defaults?: Record<string, unknown>;

  private constructDeviceDefaults = async () => {
    return {
      deviceId: await DeviceInfo.getUniqueId(),
      deviceName: await DeviceInfo.getDeviceName(),
      deviceType: await DeviceInfo.getDeviceType(),
      deviceManufacturer: await DeviceInfo.getManufacturer(),
      deviceModel: await DeviceInfo.getModel(),
      os: await DeviceInfo.getSystemName(),
      osVersion: await DeviceInfo.getSystemVersion(),
    };
  };

  constructor(defaults?: Record<string, unknown>) {
    this.constructDeviceDefaults().then((deviceDefaults) => {
      this._defaults = { ...deviceDefaults, ...defaults };
    });
  }

  public readonly dispatch = {
    [DispatcherKeys.LOG]: (message: string, extras?: Record<string, unknown>) => {
      console.log(message + '\n', JSON.stringify({ ...this._defaults, ...extras }, null, 2));
    },
    [DispatcherKeys.WARN]: (message: string, extras?: Record<string, unknown>) => {
      console.warn(message + '\n', JSON.stringify({ ...this._defaults, ...extras }, null, 2));
    },
    [DispatcherKeys.ERROR]: (message: string, extras?: Record<string, unknown>) => {
      console.error(message + '\n', JSON.stringify({ ...this._defaults, ...extras }, null, 2));
    },
  };
}

export const consoleDispatcher = new ConsoleDispatcher();
