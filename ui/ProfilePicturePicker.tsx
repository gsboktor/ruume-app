import React from 'react';
import { Image, ImageSourcePropType, View, ViewProps } from 'react-native';

import AddCircleIcon from '@Ruume/assets/icons/add.svg';

import { HapticPressable } from './HapticPressable';

import { ImpactFeedbackStyle } from 'expo-haptics';
import styled, { useTheme } from 'styled-components/native';

type ProfilePicturePickerProps = {
  onAddPicture: () => void;
  img: ImageSourcePropType;
} & ViewProps;

const ProfilePickerWrapper = styled(View)`
  position: relative;
`;

const ProfilePictureContainer = styled(View)`
  display: flex;
  width: 102px;
  height: 102px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.background};
  border: 6px solid ${({ theme }) => theme.text};
  align-items: center;
  justify-content: center;
`;

const ProfileImage = styled(Image)`
  width: 90%;
  height: 90%;
  border-radius: 100px;
`;

export const ProfilePicturePicker = ({ onAddPicture, img, ...rest }: ProfilePicturePickerProps) => {
  const theme = useTheme();
  return (
    <HapticPressable
      onPress={onAddPicture}
      style={{ maxWidth: 120, alignSelf: 'center' }}
      hapticWeight={ImpactFeedbackStyle.Medium}
    >
      <ProfilePickerWrapper {...rest}>
        <ProfilePictureContainer>
          <ProfileImage source={img} />
        </ProfilePictureContainer>
        <AddCircleIcon
          width={42}
          height={42}
          fill={theme?.text}
          style={{ position: 'absolute', bottom: -5, left: -18, zIndex: 100 }}
        />
      </ProfilePickerWrapper>
    </HapticPressable>
  );
};
