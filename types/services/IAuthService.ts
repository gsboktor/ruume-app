import { SignInType } from './SignIn';
import { SignUpType } from './SignUp';
import { VerifyOTPType } from './VerifyOTP';

import { AuthResponse, Session, User } from '@supabase/supabase-js';

export interface IAuthService {
  signUpWithPhone(signUpPayload: SignUpType): Promise<AuthResponse>;
  signInWithPhone(signInPayload: SignInType): Promise<AuthResponse>;
  verifyOTP(verifyOTPPayload: VerifyOTPType): Promise<AuthResponse>;
  getUser(): Promise<User | null>;
  getSession(): Promise<Session | null>;
}

