import { AvatarBucketResponse } from './AvatarBucketResponse';
import { CreateProfileRequest, ProfileType } from './CreateProfile';

export interface IProfileService {
  uploadAvatar(fileName: string, filePath: string, ext: string): Promise<AvatarBucketResponse>;
  getAvatar(fileName: string): Promise<string>;
  createProfile(payload: CreateProfileRequest): Promise<ProfileType>;
  getProfileById(id: string): Promise<ProfileType | null>;
}
