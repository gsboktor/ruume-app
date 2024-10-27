import React, { useContext } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ScrollView, View } from 'react-native';

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

const FormContainer = styled(ScrollView)`
  display: flex;
  flex-direction: column;
`;

export const SignUpForm = () => {
  const theme = useContext(ThemeContext);

  const { control } = useFormContext();

  return (
    <FormContainer keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag" contentContainerStyle={{ gap: 36 }}>
      <FormGroupContainer>
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { value, onChange } }) => (
            <FormField
              testID="phone-number-input"
              header="Phone Number"
              placeholder="Phone Number"
              placeholderTextColor={theme?.textLightGray}
              inputMode="tel"
              onChangeText={(text) => {
                const formatted = phoneNumberFormatter(text);
                onChange(formatted);
              }}
              maxLength={10}
              value={value}
              Icon={Phone}
              style={{ fontSize: 20, color: theme?.text, paddingRight: 8, width: '100%' }}
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
              testID="password-input"
              header="Password"
              placeholder="Password"
              placeholderTextColor={theme?.textLightGray}
              value={value}
              style={{ fontSize: 20, color: theme?.text, paddingRight: 8, width: '100%' }}
              Icon={Key}
              onChangeText={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="passwordConfirmation"
          render={({ field: { value, onChange } }) => (
            <FormField
              testID="password-confirmation-input"
              header="Confirm Password"
              placeholder="Re-enter Password"
              placeholderTextColor={theme?.textLightGray}
              value={value}
              style={{ fontSize: 20, color: theme?.text, paddingRight: 8, width: '100%' }}
              onChangeText={onChange}
            />
          )}
        />
        <RuumeFormSwitcher
          primaryLabel="Already have an account?"
          secondaryLabel="Sign in"
          formType={FormType.SIGN_IN}
          href="/(auth)/ruume-sign-in-page"
        />
      </FormGroupContainer>
    </FormContainer>
  );
};
