import { z } from "zod";

// login user
const loginSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z.any(),
  }),
});

export const AuthValidations = {
  loginSchema,
};
