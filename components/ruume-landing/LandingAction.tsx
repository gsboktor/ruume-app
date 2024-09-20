import React from 'react';
import { Pressable, Text, View } from 'react-native';

import * as Haptics from 'expo-haptics';
import styled from 'styled-components/native';

const LandingActionButton = styled(View)<{ pressed: boolean }>`
  width: 275px;
  height: 90px;
  background-color: #fff;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  text-align: center;
  ${({ pressed }) => pressed && 'transform: scale(0.95);'}
`;

export const LandingAction = () => {
  return (
    <>
      <Pressable
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }}
      >
        {({ pressed }) => {
          return (
            <LandingActionButton pressed={pressed}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '300',
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                Let&apos;s Ruume
              </Text>
            </LandingActionButton>
          );
        }}
      </Pressable>
    </>
  );
};
