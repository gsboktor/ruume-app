import { Dimensions } from 'react-native';

export const createRelativeViewportUnits = () => {
  const viewportWidth = Dimensions.get('window').width;
  const viewportHeight = Dimensions.get('window').height;

  const vh = viewportHeight / 100;
  const vw = viewportWidth / 100;

  return { vh, vw };
};

export const { vh, vw } = createRelativeViewportUnits();
