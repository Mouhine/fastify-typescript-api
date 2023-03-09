import { object, TypeOf, z } from "zod";
export const createUserSchema = object({
  body: object({
    name: z.string({
      required_error: "name is required",
    }),
    password: z
      .string({
        required_error: "password is required",
      })
      .min(6, "password too short - should be 6 characters minimum"),
    passwordConfirmation: z.string({
      required_error: "password confirmation is required",
    }),
    email: z
      .string({
        required_error: "email is required",
      })
      .email("Not a valid email"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["PasswordConfirmation"],
  }),
});

export type createUserInput = TypeOf<typeof createUserSchema>;
