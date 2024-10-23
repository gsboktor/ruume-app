
import { useAtomValue } from 'jotai';
import { atomEffect } from 'jotai-effect';

type EffectFn = Parameters<typeof atomEffect>[0];

export const useAtomEffect = (effectFn: EffectFn) => {
  return useAtomValue(atomEffect(effectFn));
};
