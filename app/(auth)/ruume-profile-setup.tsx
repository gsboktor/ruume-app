import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ImageSourcePropType, ScrollView, View } from 'react-native';
import Animated from 'react-native-reanimated';

import PencilEditIcon from '@Ruume/assets/icons/pencil_edit.svg';
import placeholderImg from '@Ruume/assets/images/placeholder.png';
import {
  useCreateProfile,
  useGetSession,
  useKeyboardAvoiding,
  useLocalImagePicker,
  useUploadAvatar,
} from '@Ruume/hooks';
import { useTransition } from '@Ruume/providers/TransitionsManager';
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

const FormFieldWrapper = styled(Animated.View)`
  width: 90%;
  align-self: center;
  position: absolute;
`;

export default function RuumeProfileSetup() {
  const theme = useTheme();
  const mutatingRef = useRef(false);

  const { enqueue } = useTransition();
  const { animatedStyle } = useKeyboardAvoiding(vh * 22, 0.975);

  const { data: session } = useGetSession();
  const { mutate: uploadFn, data: uploadAvatarData } = useUploadAvatar();

  const {
    mutateAsync: createProfileFn,
    isError: createProfileError,
    isPending: createProfilePending,
  } = useCreateProfile(session?.user.id);

  const { pickImage, loading: pickerLoading } = useLocalImagePicker({ aspect: [1, 1] });

  const [img, setImg] = useState<ImageSourcePropType | undefined>(undefined);
  const [resetSlider, setResetSlider] = useState(false);
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
    setResetSlider(false);
    if (createProfilePending) return;

    if (!mutatingRef.current) {
      mutatingRef.current = true;
      await createProfileFn({
        username: name,
        avatar_url: uploadAvatarData?.path ?? null,
      });
    }
  }, [createProfileFn, createProfilePending, name, uploadAvatarData?.path]);

  useEffect(() => {
    if (createProfileError) {
      setResetSlider(true);
      mutatingRef.current = false;
    }
  }, [createProfileError, enqueue, setNotification]);

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
        <FormFieldWrapper style={animatedStyle}>
          <FormField
            placeholder="What do we call you?"
            Icon={PencilEditIcon}
            value={name}
            onChangeText={(e) => setName(e)}
            placeholderTextColor={theme?.textLightGray}
            inputMode="text"
            header={'Name'}
            maxLength={12}
            style={{ fontSize: 16, color: theme?.text, paddingRight: 8, width: '100%' }}
            validationMessage={`${name.length} / 12`}
          />
        </FormFieldWrapper>
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
        />
      </StyledSlider>
    </>
  );
}
