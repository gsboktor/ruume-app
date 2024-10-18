import React from 'react';
import { View } from 'react-native';

import { formTypeAtom } from '@Ruume/store';
import { FormType } from '@Ruume/types/forms';

import { BaseText } from '../shared';

import * as Haptics from 'expo-haptics';
import { Href, Link } from 'expo-router';
import { useSetAtom } from 'jotai';
import styled from 'styled-components';

export type RuumeFormSwitcherProps = {
  primaryLabel: string;
  secondaryLabel: string;
  href: Href<string | object>;
  formType: FormType;
};

const FormSwitcherContainer = styled(View)`
  align-items: center;
  justify-content: center;
`;

const FormSwitcherText = styled(BaseText)`
  font-size: 16px;
  color: ${({ theme }) => theme?.textLightGray};
`;

const FormSwitcherLink = styled(Link)`
  font-size: 18px;
  color: ${({ theme }) => theme?.text};
  text-decoration-line: underline;
  margin-top: 4px;
`;

export const RuumeFormSwitcher = ({ primaryLabel, secondaryLabel, href, formType }: RuumeFormSwitcherProps) => {
  const setFormType = useSetAtom(formTypeAtom);

  return (
    <FormSwitcherContainer>
      <FormSwitcherText>{primaryLabel}</FormSwitcherText>
      <FormSwitcherLink
        href={href}
        onPress={() => {
          setFormType(formType);
          Haptics.selectionAsync();
        }}
      >
        {secondaryLabel}
      </FormSwitcherLink>
    </FormSwitcherContainer>
  );
};
