import React, { useContext } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { View } from 'react-native';

import Key from '@Ruume/assets/icons/key.svg';
import Phone from '@Ruume/assets/icons/phone.svg';
import { FormType } from '@Ruume/types/forms';
import { FormField } from '@Ruume/ui';
import { phoneNumberFormatter } from '@Ruume/utils/formatters';

import { RuumeFormSwitcher } from '../ruume-auth/RuumeFormSwitcher';

import styled, { ThemeContext } from 'styled-components';

const FormGroupContainer = styled(View)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FormContainer = styled(View)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SignInForm = () => {
  const theme = useContext(ThemeContext);

  const { control } = useFormContext();

  return (
    <FormContainer>
      <FormGroupContainer>
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { value, onChange } }) => (
            <FormField
              placeholder="Phone Number"
              header="Phone Number"
              placeholderTextColor={theme?.textLightGray}
              inputMode="tel"
              onChangeText={(text) => {
                const formatted = phoneNumberFormatter(text);
                onChange(formatted);
              }}
              maxLength={10}
              value={value}
              Icon={Phone}
              style={{ fontSize: 20, color: theme?.text, paddingRight: 8 }}
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
              header="Password"
              placeholderTextColor={theme?.textLightGray}
              value={value}
              style={{ fontSize: 20, color: theme?.text, paddingRight: 8 }}
              Icon={Key}
              onChangeText={onChange}
            />
          )}
        />
        <RuumeFormSwitcher
          primaryLabel="Don't have an account?"
          secondaryLabel="Sign up"
          formType={FormType.SIGN_UP}
          href="/(auth)/ruume-sign-up-page"
        />
      </FormGroupContainer>
    </FormContainer>
  );
};
