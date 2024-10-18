import { FieldErrors } from 'react-hook-form';

import { RuumeSignInSchema } from '../schema';

export const composeErrorMessage = (errors: FieldErrors<RuumeSignInSchema>) => {
  return Object.values(errors)
    .map((error) => error.message)
    .join('\n');
};