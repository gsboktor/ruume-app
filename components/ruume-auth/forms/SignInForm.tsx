import React, { useContext } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { View } from 'react-native';

import Key from '@Ruume/assets/icons/key.svg';
import Phone from '@Ruume/assets/icons/phone.svg';
import { phoneNumberFormatter } from '@Ruume/utils/formatters';

import { FormField } from '../../shared';

import styled, { ThemeContext } from 'styled-components';

const FormGroupContainer = styled(View)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SignInForm = () => {
  const theme = useContext(ThemeContext);

  const { control } = useFormContext();

  return (
    <>
      <FormGroupContainer>
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { value, onChange } }) => (
            <FormField
              placeholder="Phone Number"
              placeholderTextColor={theme?.textLightGray}
              inputMode="tel"
              onChangeText={(text) => {
                const formatted = phoneNumberFormatter(text);
                onChange(formatted);
              }}
              maxLength={10}
              value={value}
              icon={<Phone width={24} height={24} fill="white" />}
              style={{ fontSize: 18, color: theme?.text }}
            />
          )}
        />
      </FormGroupContainer>
      <FormGroupContainer>
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange } }) => (
            <FormField
              placeholder="Password"
              placeholderTextColor={theme?.textLightGray}
              value={value}
              style={{ fontSize: 18, color: theme?.text }}
              icon={<Key width={24} height={24} fill="white" />}
              onChangeText={onChange}
            />
          )}
        />
      </FormGroupContainer>
    </>
  );
};
