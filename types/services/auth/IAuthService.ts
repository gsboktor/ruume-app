import { SignInResponse, SignInType } from './SignIn';
import { SignUpResponse, SignUpType } from './SignUp';
import { VerifyOTPType } from './VerifyOTP';

import { Session, User } from '@supabase/supabase-js';

export interface IAuthService {
  signUpWithPhone(signUpPayload: SignUpType): Promise<SignUpResponse>;
  signInWithPhone(signInPayload: SignInType): Promise<SignInResponse>;
  verifyOTP(verifyOTPPayload: VerifyOTPType): Promise<SignUpResponse>;
  getUser(): Promise<User | null>;
  getSession(): Promise<Session | null>;
}

