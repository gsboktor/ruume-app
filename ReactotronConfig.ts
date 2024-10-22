import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from 'reactotron-react-native';

import { clearCurrentStorage, logCurrentStorage } from '@Ruume/utils/reactotron';

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: 'Ruume',
  })
  .useReactNative()
  .connect();

Reactotron.onCustomCommand({
  title: 'Log Current Storage',
  command: 'logCurrentStorage',
  description: 'Logs the current state of AsyncStorage',
  handler: () => logCurrentStorage(),
});

Reactotron.onCustomCommand({
  title: 'Clear Storage',
  command: 'clearStorage',
  description: 'Clears the AsyncStorage',
  handler: () => clearCurrentStorage(),
});
