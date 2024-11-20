import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { drawerStateAtom } from '@Ruume/store/ui';
import { BottomDrawerState, DrawerBreakPoints } from '@Ruume/types/ui';
import { vh } from '@Ruume/utils/viewport';

import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { useSetAtom } from 'jotai';
import styled, { css } from 'styled-components/native';

const drawerRadius = css`
  border-top-left-radius: 48px;
  border-top-right-radius: 48px;
`;

type DrawerSkeletonProps = {
  onStateChange?: (state: BottomDrawerState) => void;
  breakPoints?: DrawerBreakPoints;
  drawerMaxHeight?: number;
  children: React.ReactNode;
};

const DrawerContainer = styled(Animated.View)`
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  overflow: hidden;

  ${drawerRadius}
`;

const Drawer = styled(BlurView)`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  padding: 16px;
  background-color: rgba(0, 0, 0, 0.5);
  position: relative;
  ${drawerRadius}
`;

const DrawerGestureBar = styled(View)`
  width: 100%;
  height: 60px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: transparent;
  z-index: 1000;

  ${drawerRadius}
`;
const defaultDrawerMaxHeight = vh * 96;

const defaultBreakPoints: DrawerBreakPoints = {
  expanded: defaultDrawerMaxHeight,
  quarter: defaultDrawerMaxHeight * 0.75,
  half: defaultDrawerMaxHeight * 0.5,
  collapsed: 0,
};

export const DrawerSkeleton: React.FC<DrawerSkeletonProps> = ({
  children,
  onStateChange,
  breakPoints = defaultBreakPoints,
  drawerMaxHeight = defaultDrawerMaxHeight,
}) => {
  const [mountContent, setMountContent] = useState(true);
  const setDrawerState = useSetAtom(drawerStateAtom);

  const drawerHeightSharedValue = useSharedValue(0);
  const bottomPositionSharedValue = useSharedValue(0);

  const initDrawerHeight = useCallback(() => {
    'worklet';
    drawerHeightSharedValue.value = withDelay(
      250,
      withTiming(
        breakPoints.expanded ?? drawerMaxHeight ?? 0,
        {
          duration: 175,
          easing: Easing.out(Easing.ease),
        },
        () => {
          runOnJS(setMountContent)(true);
          runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
        },
      ),
    );
  }, [breakPoints.expanded, drawerHeightSharedValue, drawerMaxHeight]);

  const handleClose = useCallback(() => {
    'worklet';
    bottomPositionSharedValue.value = withTiming(
      -(drawerMaxHeight ?? 0),
      {
        duration: 500,
        easing: Easing.elastic(1.1),
      },
      () => {
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
        runOnJS(setMountContent)(false);
        runOnJS(setDrawerState)({
          visible: false,
          content: null,
          breakPoints: { expanded: 0, collapsed: 0 },
        });
      },
    );
  }, [bottomPositionSharedValue, drawerMaxHeight, setDrawerState]);

  const getClosestBreakPoint = useCallback(() => {
    'worklet';
    return Object.keys(breakPoints).reduce((prev, curr) => {
      const typedPrev = prev as BottomDrawerState;
      const typedCurr = curr as BottomDrawerState;
      const prevBreakPoint = breakPoints[typedPrev];
      const currBreakPoint = breakPoints[typedCurr];

      return Math.abs(drawerHeightSharedValue.value - (currBreakPoint ?? 0)) <
        Math.abs(drawerHeightSharedValue.value - (prevBreakPoint ?? 0))
        ? typedCurr
        : typedPrev;
    });
  }, [drawerHeightSharedValue, breakPoints]);

  const snapToClosestBreakPoint = useCallback(() => {
    'worklet';
    const closestBreakPoint = getClosestBreakPoint() as BottomDrawerState;
    if (onStateChange) {
      runOnJS(onStateChange)(closestBreakPoint);
    }

    if (closestBreakPoint === 'collapsed') {
      handleClose();
      return;
    }
    drawerHeightSharedValue.value = withDelay(
      75,
      withTiming(
        breakPoints[closestBreakPoint as BottomDrawerState] ?? 0,
        {
          duration: 350,
          easing: closestBreakPoint !== 'expanded' ? Easing.elastic(1.1) : Easing.inOut(Easing.ease),
        },
        () => {
          runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
        },
      ),
    );
  }, [getClosestBreakPoint, onStateChange, drawerHeightSharedValue, breakPoints, handleClose]);

  const drawerYPositionStyle = useAnimatedStyle(() => {
    return {
      height: drawerHeightSharedValue.value,
      bottom: bottomPositionSharedValue.value,
    };
  });

  const drawerPanGesture = useMemo(
    () =>
      Gesture.Pan()
        .enabled(mountContent)
        .onChange((event) => {
          if (drawerHeightSharedValue.value - event.changeY <= (breakPoints.expanded ?? 0)) {
            drawerHeightSharedValue.value -= event.changeY;
          }
        })
        .onTouchesUp(() => {
          snapToClosestBreakPoint();
        }),

    [mountContent, drawerHeightSharedValue, breakPoints.expanded, snapToClosestBreakPoint],
  );

  useEffect(() => {
    void initDrawerHeight();
  }, [initDrawerHeight]);

  return (
    <DrawerContainer style={drawerYPositionStyle}>
      <GestureDetector gesture={drawerPanGesture}>
        <DrawerGestureBar />
      </GestureDetector>
      {mountContent && (
        <Drawer intensity={100} tint="dark">
          {children}
        </Drawer>
      )}
    </DrawerContainer>
  );
};
