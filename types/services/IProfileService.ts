import { AvatarBucketResponse } from './AvatarBucketResponse';

export interface IProfileService {
  uploadAvatar(fileName: string, filePath: string, ext: string): Promise<AvatarBucketResponse>;
  getAvatar(fileName: string): Promise<string>;
}
