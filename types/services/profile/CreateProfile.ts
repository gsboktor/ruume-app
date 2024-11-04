import { Tables } from '@Ruume/database.types';

export type CreateProfileType = Tables<'profiles'>;

export type CreateProfileRequest = Omit<CreateProfileType, 'id' | 'updated_at' | 'created_at' >;
