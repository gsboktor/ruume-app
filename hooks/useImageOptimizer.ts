import { useCallback } from 'react';

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
        console.log('Error optimizing image:', error);
        throw error;
      }
    },
    [compression, format],
  );

  return { optimizeImage };
};
