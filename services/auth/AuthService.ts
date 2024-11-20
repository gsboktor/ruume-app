import { supabase } from '@Ruume/clients/supabase';
import { DispatcherKeys } from '@Ruume/types/logging';
import { IAuthService, SignInResponse, SignInType, SignUpType, VerifyOTPType } from '@Ruume/types/services/auth';

import { logger } from '../logging';

import { SupabaseClient } from '@supabase/supabase-js';

export class AuthService implements IAuthService {
  private readonly client: SupabaseClient;

  constructor(client: SupabaseClient) {
    this.client = client;
  }

  //TODO: scope this to only U.S. numbers, or go with configurable country code?
  async signUpWithPhone(signUpPayload: SignUpType) {
    const phoneNumber = '+1' + signUpPayload.phoneNumber.replace(/\D+/g, '');

    const { data, error } = await this.client.auth.signUp({
      phone: phoneNumber,
      password: signUpPayload.password,
      options: {
        channel: 'sms',
      },
    });

    if (error) {
      throw error;
    }

    return data;
  }

  async signInWithPhone(signInPayload: SignInType): Promise<SignInResponse> {
    const { data, error } = await this.client.auth.signInWithPassword({
      phone: '+1' + signInPayload.phoneNumber.replace(/\D+/g, ''),
      password: signInPayload.password,
    });

    if (error) {
      throw error;
    }

    return data;
  }

  async verifyOTP(verifyOTPPayload: VerifyOTPType) {
    const { data, error } = await this.client.auth.verifyOtp({
      phone: verifyOTPPayload.phoneNumber,
      token: verifyOTPPayload.code,
      type: 'sms',
    });

    if (error) {
      throw error;
    }

    return data;
  }

  async getUser() {
    const { data, error } = await this.client.auth.getUser();
    if (error) {
      logger.dispatch('Error getting user', DispatcherKeys.ERROR, { ...error });
      throw error;
    }
    return data.user;
  }

  async getSession() {
    const { data, error } = await this.client.auth.getSession();
    if (error) {
      logger.dispatch('Error getting session', DispatcherKeys.ERROR, { ...error });
      throw error;
    }
    return data.session;
  }
}

export const authService = new AuthService(supabase);
