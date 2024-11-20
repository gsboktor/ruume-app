import { Tables } from '@Ruume/database.types';

export type RuumeType = Tables<'ruumes'>;

export type CreateRuumeRequest = Omit<RuumeType, 'id' | 'created_at' | 'updated_at'>;
