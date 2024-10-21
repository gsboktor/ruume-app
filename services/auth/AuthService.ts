import { supabase } from '@Ruume/clients/supabase';
import { IAuthService, SignInType, SignUpType } from '@Ruume/types/services';
import { VerifyOTPType } from '@Ruume/types/services/VerifyOTP';

import { SupabaseClient } from '@supabase/supabase-js';

export class AuthService implements IAuthService {
  private readonly client: SupabaseClient;

  constructor(client: SupabaseClient) {
    this.client = client;
  }

  //TODO: scope this to only U.S. numbers, or go with configurable country code?
  async signUpWithPhone(signUpPayload: SignUpType) {
    const phoneNumber = '+1' + signUpPayload.phoneNumber.replace(/\D+/g, '');

    return await this.client.auth.signUp({
      phone: phoneNumber,
      password: signUpPayload.password,
      options: {
        channel: 'sms',
      },
    });
  }

  async signInWithPhone(signInPayload: SignInType) {
    return await this.client.auth.signInWithPassword({
      phone: '+1' + signInPayload.phoneNumber.replace(/\D+/g, ''),
      password: signInPayload.password,
    });
  }

  async verifyOTP(verifyOTPPayload: VerifyOTPType) {
    return await this.client.auth.verifyOtp({
      phone: verifyOTPPayload.phoneNumber,
      token: verifyOTPPayload.code,
      type: 'sms',
    });
  }
}

export const authService = new AuthService(supabase);
