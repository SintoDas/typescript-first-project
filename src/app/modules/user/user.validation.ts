import { z } from 'zod';

// Define Zod schema for user
const UserValidationSchema = z.object({
  id: z.string(),
  password: z
    .string({
      invalid_type_error: 'password must be changed',
    })
    .max(20, { message: 'Password cannot be greater than 20 characters' }),
});

export const UserValidation = {
  UserValidationSchema,
};
