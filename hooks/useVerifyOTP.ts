import { useTransition } from '@Ruume/providers/TransitionsManager';
import { authService } from '@Ruume/services/auth';
import { notificationAtom } from '@Ruume/store';
import { signUpFormAtom } from '@Ruume/store/auth';
import { VerifyOTPType } from '@Ruume/types/services/auth';

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
      try {
        if (!signUpDetails.phoneNumber || verifyOTPPayload.code.length !== OTP_LENGTH) {
          throw new Error('Error occured with parameters');
        }

        const { data, error } = await authService.verifyOTP({
          phoneNumber: signUpDetails?.phoneNumber,
          code: verifyOTPPayload.code,
        });
        if (error) {
          throw error;
        }

        return data;
      } catch (error) {
        console.log('Error verifying OTP', error);
        throw error as AuthError;
      }
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
