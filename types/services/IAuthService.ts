import { SignInType } from './SignIn';
import { SignUpType } from './SignUp';
import { VerifyOTPType } from './VerifyOTP';

import { AuthResponse, Session } from '@supabase/supabase-js';

export interface IAuthService {
  signUpWithPhone(signUpPayload: SignUpType): Promise<AuthResponse>;
  signInWithPhone(signInPayload: SignInType): Promise<AuthResponse>;
  verifyOTP(verifyOTPPayload: VerifyOTPType): Promise<AuthResponse>;
  getUserSession(): Promise<Session | null>;
}
