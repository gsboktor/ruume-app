import { AvatarBucketResponse } from './AvatarBucketResponse';
import { CreateProfileRequest, CreateProfileType } from './CreateProfile';

import { PostgrestSingleResponse } from '@supabase/supabase-js';

export interface IProfileService {
  uploadAvatar(fileName: string, filePath: string, ext: string): Promise<AvatarBucketResponse>;
  getAvatar(fileName: string): Promise<string>;
  createProfile(payload: CreateProfileRequest): Promise<PostgrestSingleResponse<CreateProfileType[]>>;
}
