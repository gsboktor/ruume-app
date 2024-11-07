import { Dimensions } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';

export const createRelativeViewportUnits = () => {
  const viewportWidth = Dimensions.get('window').width;
  const viewportHeight = Dimensions.get('window').height;
  const pageInsets = initialWindowMetrics?.insets ?? { top: 0, left: 0, right: 0, bottom: 0 };

  const vh = (viewportHeight - (pageInsets.top + pageInsets.bottom)) / 100;
  const vw = viewportWidth / 100;

  return { vh, vw };
};

export const { vh, vw } = createRelativeViewportUnits();
