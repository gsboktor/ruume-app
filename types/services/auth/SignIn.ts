import { Session, User, WeakPassword } from '@supabase/supabase-js';

export type SignInType = {
  phoneNumber: string;
  password: string;
};

export type SignInResponse = {
  user: User;
  session: Session;
  weakPassword?: WeakPassword;
};
