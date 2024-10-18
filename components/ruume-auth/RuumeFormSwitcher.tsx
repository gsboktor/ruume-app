import React from 'react';
import { View } from 'react-native';

import { BaseText } from '../shared';

import * as Haptics from 'expo-haptics';
import { Href, Link } from 'expo-router';
import styled from 'styled-components';

export type RuumeFormSwitcherProps = {
  primaryLabel: string;
  secondaryLabel: string;
  href: Href<string | object>;
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

export const RuumeFormSwitcher = ({ primaryLabel, secondaryLabel, href }: RuumeFormSwitcherProps) => {
  return (
    <FormSwitcherContainer>
      <FormSwitcherText>{primaryLabel}</FormSwitcherText>
      <FormSwitcherLink
        href={href}
        onPress={() => {
          Haptics.selectionAsync();
        }}
      >
        {secondaryLabel}
      </FormSwitcherLink>
    </FormSwitcherContainer>
  );
};
