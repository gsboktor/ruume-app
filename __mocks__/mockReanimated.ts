export const mockReanimated = {
  runOnJS: (fn: () => void) => fn,
  withSpring: jest.fn(),
  withTiming: jest.fn(),
  withSequence: jest.fn(),
  withDelay: jest.fn(),
  View: jest.fn(),
  Text: jest.fn(),
  ScrollView: jest.fn(),
  Image: jest.fn(),
  TouchableOpacity: jest.fn(),
  useAnimatedStyle: jest.fn(),
  useSharedValue: (initialValue: number) => ({
    value: initialValue,
  }),
  useAnimatedProps: jest.fn(),
  useAnimatedReaction: jest.fn(),
};
