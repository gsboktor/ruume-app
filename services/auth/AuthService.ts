import { supabase } from '@Ruume/clients/supabase';
import { IAuthService, SignInType, SignUpType } from '@Ruume/types/services';

import { SupabaseClient } from '@supabase/supabase-js';

export class AuthService implements IAuthService {
  private readonly client: SupabaseClient;

  constructor(client: SupabaseClient) {
    this.client = client;
  }

  async signUpWithPhone(signUpPayload: SignUpType) {
    console.log('signUpPayload', signUpPayload);
    const phoneNumber = '+1' + signUpPayload.phoneNumber.replace(/\D+/g, '');
    console.log('phoneNumber', phoneNumber);

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
}

export const authService = new AuthService(supabase);
