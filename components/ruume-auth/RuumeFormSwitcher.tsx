import React, { useCallback } from 'react';
import { Keyboard, Text, View } from 'react-native';

import { formTypeAtom } from '@Ruume/store/auth';
import { FormType } from '@Ruume/types/forms';
import { BaseText, HapticPressable } from '@Ruume/ui';

import * as Haptics from 'expo-haptics';
import { Href, router } from 'expo-router';
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
  font-size: 15px;
  color: ${({ theme }) => theme?.textLightGray};
`;

const FormSwitcherLink = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme?.text};
  text-decoration-line: underline;
`;

export const RuumeFormSwitcher = ({ primaryLabel, secondaryLabel, href, formType }: RuumeFormSwitcherProps) => {
  const setFormType = useSetAtom(formTypeAtom);
  const onPress = useCallback(() => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
      return;
    }
    setFormType(formType);
    router.navigate(href);
  }, [formType, setFormType, href]);

  return (
    <FormSwitcherContainer>
      <FormSwitcherText>{primaryLabel}</FormSwitcherText>
      <HapticPressable onPress={onPress} hapticWeight={Haptics.ImpactFeedbackStyle.Light}>
        <FormSwitcherLink>{secondaryLabel}</FormSwitcherLink>
      </HapticPressable>
    </FormSwitcherContainer>
  );
};
