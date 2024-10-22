import AsyncStorage from '@react-native-async-storage/async-storage';

export function logCurrentStorage() {
  const tryParse = (value: string) => {
    try {
      return JSON.parse(value);
    } catch (e) {
      console.log('Error parsing value: ', e);
      return value;
    }
  };
  
  AsyncStorage.getAllKeys().then((keyArray) => {
    AsyncStorage.multiGet(keyArray).then((keyValArray) => {
      const storageItems: Record<string, unknown> = {};
      for (const keyVal of keyValArray) {
        storageItems[keyVal[0]] = tryParse(keyVal[1] ?? '{}');
      }
  
      console.log('CURRENT STORAGE: \n', storageItems);
    });
  });
}