import React, { useState } from 'react';
import { ImageSourcePropType, KeyboardAvoidingView, ScrollView, View } from 'react-native';

import PencilEditIcon from '@Ruume/assets/icons/pencil_edit.svg';
import placeholderImg from '@Ruume/assets/images/placeholder.png';
import { BaseText, ContinueSlider, FormField, ProfilePicturePicker } from '@Ruume/ui';
import { vh } from '@Ruume/utils/viewport';

import styled, { useTheme } from 'styled-components/native';

const RuumeProfileSetupContainer = styled(ScrollView)`
  display: flex;
  background-color: ${({ theme }) => theme.background};
  padding: 16px;
`;

const RuumeProfileMainContent = styled(View)`
  display: flex;
  flex: 1.25;
  gap: 16px;
  background-color: ${({ theme }) => theme.background};
`;

const RuumeProfileFooterContent = styled(View)`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  gap: 16px;
`;

export default function RuumeProfileSetup() {
  const theme = useTheme();
  const [img] = useState<ImageSourcePropType>(placeholderImg);

  return (
    <RuumeProfileSetupContainer contentContainerStyle={{ flex: 1 }}>
      <RuumeProfileMainContent>
        <BaseText style={{ fontSize: 32, color: theme?.text, width: '80%', flexWrap: 'wrap' }}>
          Let&apos;s get to know each other.
        </BaseText>
        <ProfilePicturePicker onAddPicture={() => {}} img={img} style={{ alignSelf: 'center' }} />
        <BaseText style={{ fontSize: 16, color: theme?.textLightGray, alignSelf: 'center' }}>
          Tap to add a picture
        </BaseText>
      </RuumeProfileMainContent>
      <RuumeProfileFooterContent>
        <ContinueSlider onSlideComplete={() => {}} reset={false} loading={false} />
      </RuumeProfileFooterContent>
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        keyboardVerticalOffset={vh * 19}
        style={{ width: '90%', alignSelf: 'center', position: 'absolute', bottom: 92 }}
      >
        <FormField
          placeholder="What do we call you?"
          Icon={PencilEditIcon}
          placeholderTextColor={theme?.textLightGray}
          header={'Name'}
          style={{ fontSize: 16, color: theme?.text, paddingRight: 8 }}
        />
      </KeyboardAvoidingView>
    </RuumeProfileSetupContainer>
  );
}
