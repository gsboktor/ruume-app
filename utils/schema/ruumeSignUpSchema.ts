import * as yup from 'yup';

export type RuumeSignUpSchema = yup.InferType<typeof ruumeSignUpSchema>;

export const ruumeSignUpSchema = yup.object().shape({
  phoneNumber: yup.string().required('Phone number is required').matches(/\([0-9]+\)\s[0-9]{3}-[0-9]{4}/i, 'Phone number is invalid'),
  name: yup.string().required('Name is required').min(2, 'Name is too short'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Password confirmation is required'),
});
