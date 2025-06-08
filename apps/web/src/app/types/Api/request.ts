import { z } from "zod";
export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(12),
  fullname: z.string().min(1),
});
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(12),
});
