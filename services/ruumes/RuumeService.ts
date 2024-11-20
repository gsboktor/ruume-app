import { supabase } from '@Ruume/clients/supabase';
import { DispatcherKeys } from '@Ruume/types/logging';
import { CreateRuumeRequest, IRuumeService, RuumeType } from '@Ruume/types/services/ruumes';

import { logger } from '../logging';

import { PostgrestError, SupabaseClient } from '@supabase/supabase-js';

export class RuumeService implements IRuumeService {
  constructor(private readonly client: SupabaseClient) {}

  async createRuume(request: CreateRuumeRequest): Promise<RuumeType> {
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    try {
      const { data, error } = await this.client
        .from('ruumes')
        .insert({ ...request, updated_at: updatedAt, created_at: createdAt })
        .select()
        .returns<RuumeType[]>()
        .single();
      if (error) throw error;
      return data;
    } catch (error) {
      logger.dispatch('Failed to create ruume', DispatcherKeys.ERROR, { error });
      throw error as PostgrestError;
    }
  }

  async getRuume(profile_id: string): Promise<RuumeType | null> {
    try {
      const { data, error } = await this.client
        .from('ruumes')
        .select()
        .eq('owner_id', profile_id)
        .returns<RuumeType[]>()
        .maybeSingle();

      if (error) throw error;
      return data;
    } catch (error) {
      logger.dispatch('Failed to get ruume', DispatcherKeys.ERROR, { error });
      throw error as PostgrestError;
    }
  }
}

export const ruumeService = new RuumeService(supabase);
