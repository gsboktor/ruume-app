import React, { useCallback, useEffect } from 'react';
import { NativeSyntheticEvent, TextInput, TextInputKeyPressEventData, View } from 'react-native';

import { HapticPressable } from '@Ruume/ui';
import { vh, vw } from '@Ruume/utils/viewport';

import { LinearGradient } from 'expo-linear-gradient';
import styled, { useTheme } from 'styled-components';

const OTP_LENGTH = 6;

const DigitInputContainer = styled(View)`
  display: flex;
  flex-direction: row;
  gap: ${vw * 10}px;
  justify-content: center;
`;

const DigitGroupContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  gap: ${vw * 2.25}px;
`;

const DigitInputBox = styled(HapticPressable)`
  flex: 1;
  height: ${vh * 8}px;
`;

const DigitGradient = styled(LinearGradient)`
  flex: 1;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DigitInput = styled(TextInput)`
  font-size: ${vh * 4.5}px;
  text-align: center;
`;

type RuumeOTPFieldProps = {
  digitRefs: React.MutableRefObject<TextInput[]>;
  otpDigitsValue: React.MutableRefObject<string[]>;
};

//TODO: Handle autocomplete from clipboard. Might require a refactor to use onChangeText.

export const RuumeOTPField = ({ digitRefs, otpDigitsValue }: RuumeOTPFieldProps) => {
  const theme = useTheme();

  const handleKeyPress = useCallback(
    (e: NativeSyntheticEvent<TextInputKeyPressEventData>, idx: number) => {
      if (e.nativeEvent.key === 'Backspace') {
        digitRefs.current[idx]?.setNativeProps({ text: '' });
        otpDigitsValue.current[idx] = '';
        if (idx !== 0) {
          digitRefs.current[idx - 1]?.focus();
        } else {
          digitRefs.current[idx]?.blur();
        }
      } else {
        digitRefs.current[idx]?.setNativeProps({ text: e.nativeEvent.key });
        otpDigitsValue.current[idx] = e.nativeEvent.key;
        if (idx !== OTP_LENGTH - 1) {
          digitRefs.current[idx + 1]?.focus();
        } else {
          digitRefs.current[idx]?.blur();
        }
      }
    },
    [digitRefs, otpDigitsValue],
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      digitRefs.current[0]?.focus();
    }, 300);
    return () => clearTimeout(timeout);
  }, [digitRefs]);

  return (
    <DigitInputContainer>
      <DigitGroupContainer>
        {Array.from({ length: OTP_LENGTH / 2 })
          .slice(0, OTP_LENGTH / 2)
          .map((_, idx) => (
            <DigitInputBox
              key={idx}
              onPress={(e) => {
                e.preventDefault();
                digitRefs.current[idx]?.focus();
              }}
            >
              <DigitGradient colors={['#434343', '#303030']}>
                <DigitInput
                  style={{ color: theme?.text }}
                  selectionColor={theme?.text}
                  maxLength={1}
                  onKeyPress={(e) => {
                    handleKeyPress(e, idx);
                  }}
                  keyboardType="numeric"
                  ref={(ref) => {
                    digitRefs.current[idx] = ref ?? ({} as TextInput);
                  }}
                />
              </DigitGradient>
            </DigitInputBox>
          ))}
      </DigitGroupContainer>
      <DigitGroupContainer>
        {Array.from({ length: OTP_LENGTH })
          .slice(OTP_LENGTH / 2)
          .map((_, idx) => (
            <DigitInputBox
              key={idx + OTP_LENGTH / 2}
              onPress={() => {
                digitRefs.current[idx + OTP_LENGTH / 2]?.focus();
              }}
            >
              <DigitGradient colors={['#434343', '#303030']}>
                <DigitInput
                  style={{ color: theme?.text }}
                  keyboardType="numeric"
                  selectionColor={theme?.text}
                  maxLength={1}
                  onKeyPress={(e) => {
                    handleKeyPress(e, idx + OTP_LENGTH / 2);
                  }}
                  ref={(ref) => {
                    digitRefs.current[idx + OTP_LENGTH / 2] = ref ?? ({} as TextInput);
                  }}
                />
              </DigitGradient>
            </DigitInputBox>
          ))}
      </DigitGroupContainer>
    </DigitInputContainer>
  );
};
