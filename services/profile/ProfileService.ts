import { supabase } from '@Ruume/clients/supabase';
import {
  AvatarBucketResponse,
  CreateProfileRequest,
  CreateProfileType,
  IProfileService,
} from '@Ruume/types/services/profile';

import { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

export class ProfileService implements IProfileService {
  private readonly client: SupabaseClient;

  constructor(client: SupabaseClient) {
    this.client = client;
  }

  async uploadAvatar(filename: string, filePath: string, ext: string): Promise<AvatarBucketResponse> {
    const buffer = await fetch(filePath).then((res) => res.arrayBuffer());

    const { data, error } = await this.client.storage.from('avatars').upload(filename, buffer, {
      upsert: true,
      contentType: `image/${ext}`,
    });

    if (error) {
      throw error;
    }

    return data as AvatarBucketResponse;
  }

  async getAvatar(fileName?: string): Promise<string> {
    if (!fileName) {
      throw new Error('File name is required');
    }

    const { data } = await this.client.storage.from('avatars').getPublicUrl(fileName, {
      download: true,
    });

    if (!data) {
      throw new Error('Avatar not found');
    }

    return data.publicUrl;
  }

  async createProfile({
    user_id,
    username,
    avatar_url,
  }: CreateProfileRequest): Promise<PostgrestSingleResponse<CreateProfileType[]>> {
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const profile_id = uuidv4();

    try {
      const data = await this.client
        .from('profiles')
        .insert({
          id: profile_id,
          user_id: user_id,
          username: username,
          avatar_url: avatar_url,
          created_at: createdAt,
          updated_at: updatedAt,
        })
        .select()
        .returns<CreateProfileType[]>();

      if (!data) {
        throw new Error();
      }

      return data;
    } catch (error) {
      console.error('Failed to create profile: ', error);
      throw error;
    }
  }
}

export const profileService = new ProfileService(supabase);
