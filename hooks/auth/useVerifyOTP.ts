import { useTransition } from '@Ruume/providers/TransitionsManager';
import { authService } from '@Ruume/services/auth';
import { notificationAtom } from '@Ruume/store';
import { signUpFormAtom } from '@Ruume/store/auth';
import { SignUpResponse, VerifyOTPType } from '@Ruume/types/services/auth';
import { tryAsync } from '@Ruume/utils/tryAsync';

import { AuthError } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';
import { useAtomValue, useSetAtom } from 'jotai';

const OTP_LENGTH = 6;

export const useVerifyOTP = () => {
  const setNotification = useSetAtom(notificationAtom);
  const signUpDetails = useAtomValue(signUpFormAtom);
  const { enqueue } = useTransition();

  return useMutation({
    mutationFn: async (verifyOTPPayload: Omit<VerifyOTPType, 'phoneNumber'>) => {
      return await tryAsync<SignUpResponse, AuthError | Error>(
        async () => {
          if (!signUpDetails.phoneNumber || verifyOTPPayload.code.length !== OTP_LENGTH) {
            throw new Error('Error occured with parameters') as Error;
          }
          return await authService.verifyOTP({
            phoneNumber: signUpDetails.phoneNumber,
            code: verifyOTPPayload.code,
          });
        },
        (err) => {
          throw err;
        },
      );
    },
    retry: 2,
    onError: (_, variables) => {
      if (!signUpDetails.phoneNumber) {
        enqueue('/(auth)/ruume-sign-up-page');
        setNotification({
          default: {
            visible: true,
            message: 'Please re-enter your details',
            messageContent: 'Please re-enter your details to continue.',
          },
        });
        return;
      }
      if (variables.code.length !== OTP_LENGTH) {
        setNotification({
          default: {
            visible: true,
            message: 'Error verifying OTP',
            messageContent: 'Please check your code',
          },
        });
        return;
      }
    },
  });
};
