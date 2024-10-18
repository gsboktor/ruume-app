import { useForm } from 'react-hook-form';

import { FormType } from '@Ruume/types/forms';
import { RuumeSignInSchema, ruumeSignInSchema, RuumeSignUpSchema, ruumeSignUpSchema } from '@Ruume/utils/schema';

import { yupResolver } from '@hookform/resolvers/yup';

const formTypeToSchems = {
  [FormType.SIGN_UP]: ruumeSignUpSchema,
  [FormType.SIGN_IN]: ruumeSignInSchema,
};

export const useAuthFormByType = (formType: FormType) => {
  const schema = formTypeToSchems[formType];

  const methods = useForm<RuumeSignInSchema | RuumeSignUpSchema>({
    resolver: yupResolver(schema),
    defaultValues: {
      phoneNumber: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  return methods;
};
