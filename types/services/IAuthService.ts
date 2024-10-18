import { SignInType } from './SignIn';
import { SignUpType } from './SignUp';

import { AuthResponse } from '@supabase/supabase-js';

export interface IAuthService {
  signUpWithPhone(signUpPayload: SignUpType): Promise<AuthResponse>;
  signInWithPhone(signInPayload: SignInType): Promise<AuthResponse>;
}
