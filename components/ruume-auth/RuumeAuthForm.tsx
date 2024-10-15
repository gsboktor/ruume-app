import React, { useContext } from 'react';
import { Keyboard, TextInput, View } from 'react-native';

import Key from '@Ruume/assets/icons/key.svg';
import NameCard from '@Ruume/assets/icons/name_card.svg';
import Phone from '@Ruume/assets/icons/phone.svg';

import styled, { ThemeContext } from 'styled-components/native';

const FormFieldContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: '100%';
  gap: 8px;
`;

const FormGroupContainer = styled(View)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FormContainer = styled(View)`
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

export default function RuumeAuthForm() {
  const theme = useContext(ThemeContext);

  return (
    <FormContainer>
      <FormGroupContainer>
        <FormFieldContainer>
          <NameCard width={24} height={24} fill="white" />
          <TextInput
            placeholder="Phone Number"
            inputMode="numeric"
            style={{
              fontSize: 38,
              color: theme?.text,
            }}
            placeholderTextColor={theme?.textSubtle}
            onSubmitEditing={Keyboard.dismiss}
          />
        </FormFieldContainer>
        <FormFieldContainer>
          <Key width={24} height={24} fill="white" />
          <TextInput
            placeholder="Name"
            style={{
              fontSize: 38,
              color: theme?.text,
            }}
            placeholderTextColor={theme?.textSubtle}
            onSubmitEditing={Keyboard.dismiss}
          />
        </FormFieldContainer>
      </FormGroupContainer>
      <FormGroupContainer>
        <FormFieldContainer>
          <Phone width={24} height={24} fill="white" />
          <TextInput
            placeholder="Password"
            style={{
              fontSize: 38,
              color: theme?.text,
            }}
            placeholderTextColor={theme?.textSubtle}
            onSubmitEditing={Keyboard.dismiss}
          />
        </FormFieldContainer>
        <FormFieldContainer>
          <TextInput
            placeholder="Re-enter Password"
            style={{
              fontSize: 26,
              color: theme?.text,
              paddingLeft: 32,
            }}
            placeholderTextColor={theme?.textSubtle}
            onSubmitEditing={Keyboard.dismiss}
          />
        </FormFieldContainer>
      </FormGroupContainer>
    </FormContainer>
  );
}
