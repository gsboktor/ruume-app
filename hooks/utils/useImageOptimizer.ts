import { useCallback } from 'react';

import { logger } from '@Ruume/services/logging';
import { DispatcherKeys } from '@Ruume/types/logging';

import * as ImageManipulator from 'expo-image-manipulator';

type ImageOptimizerProps = {
  compression?: number;
  format?: ImageManipulator.SaveFormat;
};

export const useImageOptimizer = ({
  compression = 0.1,
  format = ImageManipulator.SaveFormat.JPEG,
}: ImageOptimizerProps) => {
  const optimizeImage = useCallback(
    async (uri: string) => {
      try {
        const optimizedImage = await ImageManipulator.manipulateAsync(uri, [{ resize: { width: 350 } }], {
          compress: compression,
          format,
        });
        return optimizedImage;
      } catch (error) {
        logger.dispatch(DispatcherKeys.ERROR, 'Error optimizing image', { error });
        throw error;
      }
    },
    [compression, format],
  );

  return { optimizeImage };
};
