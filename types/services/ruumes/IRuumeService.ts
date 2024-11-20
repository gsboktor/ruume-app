import { CreateRuumeRequest, RuumeType } from './RuumeTypes';

export interface IRuumeService {
  createRuume: (request: CreateRuumeRequest) => Promise<RuumeType>;
  getRuume: (profile_id: string) => Promise<RuumeType | null>;
}
