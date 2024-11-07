import { Tables } from '@Ruume/database.types';

export type ProfileType = Tables<'profiles'>;

export type CreateProfileRequest = Omit<ProfileType, 'id' | 'updated_at' | 'created_at' >;
