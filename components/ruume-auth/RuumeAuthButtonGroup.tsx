import React, { useContext } from 'react';
import { View } from 'react-native';

import { BaseText, HapticPressable } from '../shared';

import styled, { ThemeContext } from 'styled-components/native';
const ButtonGroupContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 16px;
`;

const ActiveButtonContainer = styled(View)`
  background-color: ${({ theme }) => theme?.lightBackground};
  border-radius: 25px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// const enum ActiveButton {
//   SIGNIN = 'signin',
//   SIGNUP = 'signup',
// }

export default function RuumeAuthButtonGroup() {
  const theme = useContext(ThemeContext);
  //   const [activeButton, setActiveButton] = useState(ActiveButton.SIGNIN);

  return (
    <ButtonGroupContainer>
      <HapticPressable style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <BaseText style={{ color: theme?.text, fontSize: 20 }}>Sign in</BaseText>
      </HapticPressable>
      <HapticPressable style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
        <ActiveButtonContainer style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <BaseText type="stylized" style={{ fontSize: 32, height: 'auto' }}>
            Sign Up
          </BaseText>
        </ActiveButtonContainer>
      </HapticPressable>
    </ButtonGroupContainer>
  );
}
