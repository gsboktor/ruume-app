import { useForm } from 'react-hook-form';

import { RuumeSignInSchema, ruumeSignInSchema, RuumeSignUpSchema, ruumeSignUpSchema } from '@Ruume/utils/schema';

import { yupResolver } from '@hookform/resolvers/yup';

const formTypeToSchems = {
  signUp: ruumeSignUpSchema,
  signIn: ruumeSignInSchema,
};

export const useAuthFormByType = (formType: 'signUp' | 'signIn') => {
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
