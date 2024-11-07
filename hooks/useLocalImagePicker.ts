import { useCallback, useState } from 'react';

import { logger } from '@Ruume/services/logging';
import { notificationAtom } from '@Ruume/store';
import { DispatcherKeys } from '@Ruume/types/logging';

import { useImageOptimizer } from './useImageOptimizer';

import Constants from 'expo-constants';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { useSetAtom } from 'jotai';

type UseLocalImagePickerProps = {
  aspect?: [number, number];
};

export const useLocalImagePicker = ({ aspect }: UseLocalImagePickerProps) => {
  const setNotification = useSetAtom(notificationAtom);
  const [pickerLoading, setPickerLoading] = useState(false);

  const { optimizeImage } = useImageOptimizer({
    compression: 0.75,
    format: ImageManipulator.SaveFormat.JPEG,
  });

  const getPermission = useCallback(async () => {
    if (Constants.platform?.ios) {
      const cameraRollStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!cameraRollStatus.granted) {
        setNotification({
          default: {
            visible: true,
            message: 'Update permissions to access photos',
            messageContent: 'You can update your app permissions in your Settings.',
          },
        });
      }
      return cameraRollStatus.granted;
    }
  }, [setNotification]);

  const pickImage = useCallback(async () => {
    try {
      const permission = await getPermission();
      if (!permission) {
        return;
      }
      setPickerLoading(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        allowsMultipleSelection: false,
        aspect,
        quality: 1,
      });

      if (!result || result.canceled) {
        return;
      }

      if (result.assets?.[0]?.uri) {
        const optimizedImage = await optimizeImage(result.assets[0].uri);
        return optimizedImage;
      }
    } catch (e) {
      setNotification({
        default: {
          visible: true,
          message: 'Error picking image',
          messageContent: 'There was an error picking the image. Please try again.',
        },
      });
      logger.dispatch(DispatcherKeys.ERROR, 'Error picking image', { e });
    } finally {
      setPickerLoading(false);
    }
  }, [aspect, getPermission, optimizeImage, setNotification]);

  return { getPermission, pickImage, loading: pickerLoading };
};
