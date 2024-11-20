import { Session, User } from '@supabase/supabase-js';

export type SignUpType = {
  phoneNumber: string;
  password: string;
};

export type SignUpResponse = {
  session: Session | null;
  user: User | null;
};
