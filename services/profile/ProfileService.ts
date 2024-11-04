import { supabase } from '@Ruume/clients/supabase';
import { AvatarBucketResponse, IProfileService } from '@Ruume/types/services';

import { SupabaseClient } from '@supabase/supabase-js';

export class ProfileService implements IProfileService {
  private readonly client: SupabaseClient;

  constructor(client: SupabaseClient) {
    this.client = client;
  }

  async uploadAvatar(filename: string, filePath: string, ext: string) {
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

  async getAvatar(fileName?: string) {
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

  async createProfile(uid: string, name: string, avatar: string) {
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    try {
      const data = await this.client
        .from('profiles')
        .insert({ user_id: uid, username: name, avatar_url: avatar, created_at: createdAt, updated_at: updatedAt });

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
