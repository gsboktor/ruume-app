import React, { useCallback, useMemo, useState } from 'react';
import { ImageSourcePropType, KeyboardAvoidingView, ScrollView, View } from 'react-native';

import PencilEditIcon from '@Ruume/assets/icons/pencil_edit.svg';
import placeholderImg from '@Ruume/assets/images/placeholder.png';
import { useLocalImagePicker, useUploadAvatar } from '@Ruume/hooks';
import { useGetSession } from '@Ruume/hooks/useGetSession';
import { notificationAtom } from '@Ruume/store';
import { BaseText, ContinueSlider, FormField, ProfilePicturePicker } from '@Ruume/ui';
import { vh } from '@Ruume/utils/viewport';

import { SaveFormat } from 'expo-image-manipulator';
import { useSetAtom } from 'jotai';
import styled, { useTheme } from 'styled-components/native';

const RuumeProfileSetupContainer = styled(ScrollView)`
  display: flex;
  background-color: ${({ theme }) => theme.background};
  padding: 16px;
`;

const RuumeProfileMainContent = styled(View)`
  display: flex;
  flex: 1.25;
  gap: 32px;
  background-color: ${({ theme }) => theme.background};
`;

const StyledSlider = styled(View)`
  width: 100%;
  align-self: center;
  position: absolute;
  bottom: 16px;
  padding: 16px;
`;

export default function RuumeProfileSetup() {
  const theme = useTheme();

  const { data: session } = useGetSession();
  const { mutate: uploadFn, isError: uploadAvatarError, isPending: uploadAvatarPending } = useUploadAvatar();
  const { pickImage, loading: pickerLoading } = useLocalImagePicker({ aspect: [1, 1] });

  const [img, setImg] = useState<ImageSourcePropType>(placeholderImg);
  const [resetSlider, setResetSlider] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const setNotification = useSetAtom(notificationAtom);

  const getImageFromPicker = useCallback(async () => {
    const result = await pickImage();
    if (!result) {
      return;
    }
    const asset = result?.uri ? { uri: result.uri } : placeholderImg;
    setImg(asset);

    const ext = result.uri.split('.').pop() ?? SaveFormat.JPEG;
    const fileName = `${session?.user.id}/avatar.${ext}`;

    uploadFn({ fileName, filePath: result.uri, ext });
  }, [pickImage, session?.user.id, uploadFn]);

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    setResetSlider(false);
  }, []);

  useMemo(() => {
    if (!uploadAvatarPending) {
      if (uploadAvatarError) {
        setNotification({
          default: {
            visible: true,
            message: 'Error uploading avatar',
            messageContent: 'Please try again',
          },
        });
        setImg(placeholderImg);
      }
    }
  }, [setNotification, uploadAvatarError, uploadAvatarPending]);

  return (
    <>
      <RuumeProfileSetupContainer contentContainerStyle={{ flex: 1 }}>
        <RuumeProfileMainContent>
          <BaseText style={{ fontSize: 32, color: theme?.text, width: '80%', flexWrap: 'wrap' }}>
            Let&apos;s get to know each other.
          </BaseText>
          <View style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
            <BaseText style={{ fontSize: 16, color: theme?.textLightGray, alignSelf: 'center' }}>
              Tap to add a picture
            </BaseText>
            <ProfilePicturePicker
              onAddPicture={getImageFromPicker}
              img={img}
              loading={pickerLoading}
              style={{ alignSelf: 'center' }}
            />
          </View>
        </RuumeProfileMainContent>
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          keyboardVerticalOffset={vh * 16}
          style={{ width: '90%', alignSelf: 'center', position: 'absolute', bottom: vh * 22 }}
        >
          <FormField
            placeholder="What do we call you?"
            Icon={PencilEditIcon}
            value={name}
            onChangeText={(e) => setName(e)}
            placeholderTextColor={theme?.textLightGray}
            inputMode="text"
            header={'Name'}
            maxLength={12}
            style={{ fontSize: 16, color: theme?.text, paddingRight: 8 }}
            validationMessage={`${name.length} / 12`}
          />
        </KeyboardAvoidingView>
      </RuumeProfileSetupContainer>
      <StyledSlider>
        <ContinueSlider
          disabled={img === placeholderImg || name.length < 3}
          notification={{
            message: 'Fill all fields',
            messageContent: 'Please upload an avatar and enter a valid name to continue.',
            visible: true,
          }}
          onSlideComplete={handleSubmit}
          reset={resetSlider}
          loading={loading}
        />
      </StyledSlider>
    </>
  );
}
