import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'role is required',
    }),
    password: z.string().optional(),
  }),
});

// const schema = z.object({
//   body: z.object({
//     role: z.string().nonempty("role is required"),
//   }),
// });

export const UserValidation = {
  createUserZodSchema,
};
