import React from 'react';
import { Image, ImageSourcePropType, View, ViewProps } from 'react-native';

import AddCircleIcon from '@Ruume/assets/icons/add.svg';
import placeholderImg from '@Ruume/assets/images/placeholder.png';

import { HapticPressable } from './HapticPressable';
import { LoadingIndicator } from './LoadingIndicator';

import { ImpactFeedbackStyle } from 'expo-haptics';
import styled, { useTheme } from 'styled-components/native';

type ProfilePicturePickerProps = {
  onAddPicture: () => void;
  img?: ImageSourcePropType;
  loading: boolean;
} & ViewProps;

const ProfilePickerWrapper = styled(View)`
  position: relative;
`;

const ProfilePictureContainer = styled(View)`
  display: flex;
  width: 124px;
  height: 124px;
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

export const ProfilePicturePicker = ({
  onAddPicture,
  img = placeholderImg,
  loading = false,
  ...rest
}: ProfilePicturePickerProps) => {
  const theme = useTheme();
  return (
    <HapticPressable
      onPress={onAddPicture}
      style={{ maxWidth: 120, alignSelf: 'center' }}
      hapticWeight={ImpactFeedbackStyle.Medium}
    >
      <ProfilePickerWrapper {...rest}>
        <ProfilePictureContainer>
          {!loading ? <ProfileImage source={img} testID="profile-image" /> : <LoadingIndicator inverted />}
        </ProfilePictureContainer>
        <AddCircleIcon
          width={62}
          height={62}
          fill={theme?.text}
          style={{ position: 'absolute', bottom: -18, left: -32, zIndex: 100 }}
        />
      </ProfilePickerWrapper>
    </HapticPressable>
  );
};
