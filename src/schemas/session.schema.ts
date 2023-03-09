import { object, z } from "zod";

export const createSessionSchema = object({
  body: object({
    email: z.string({ required_error: "email is required" }),
    password: z.string({ required_error: "password is required" }),
  }),
});
