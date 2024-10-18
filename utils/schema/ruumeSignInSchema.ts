import * as yup from 'yup';

export type RuumeSignInSchema = yup.InferType<typeof ruumeSignInSchema>;

export const ruumeSignInSchema = yup.object().shape({
  phoneNumber: yup.string().required('Phone number is required').matches(/\([0-9]+\)\s[0-9]{3}-[0-9]{4}/i, 'Phone number is invalid'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});
