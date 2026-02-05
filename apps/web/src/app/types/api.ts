import { z } from "zod";

export interface ApiConfig<TResponse, TPayload = undefined> {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  queryParams?: Record<string, string | number | boolean>;
  payload?: TPayload;
  responseSchema?: z.ZodSchema<TResponse>;
  payloadSchema?: z.ZodSchema<TPayload>;
}

export interface ApiError {
  message: string;
  status?: number;
  details?: unknown;
}

export const streamSchema = z.object({
  links: z.object({ sub: z.string().nullable(), dub: z.string().nullable() }),
  publishedEpisodes: z.int32(),
});
export type TStream = z.infer<typeof streamSchema>;
const AuthserResponse = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  profilePicture: z.string().nullable(),
  coverPicture: z.string().nullable(),
  bio: z.string().nullable(),
  dateOfBirth: z.coerce.date().nullable(),
  isVerified: z.boolean(),
  isBlocked: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  lastLogin: z.coerce.date().nullable(),
});
// Register Endpoint API Type
export const registerDataSchema = z.object({
  user: AuthserResponse,
});

// Composed Endpoint Schemas
export const registerResponseSchema = AuthserResponse;

//Inferred Types
export type RegisterResponse = z.infer<typeof registerResponseSchema>;
export const loginDataSchema = z.object({
  user: AuthserResponse,
  accessToken: z.string(),
  refreshToken: z.string(),
});
export const loginResponseSchema = loginDataSchema;

export type LoginResponse = z.infer<typeof loginResponseSchema>;

export const logoutDataSchema = z.object({
  message: z.string(),
});
export const logoutResponseSchema = logoutDataSchema;

export type LogoutResponse = z.infer<typeof logoutResponseSchema>;

export const OTPSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  otpHash: z.string(),
  createdAt: z.coerce.date(),
  expiresAt: z.coerce.date(),
});

export const generateOTPResponseSchema = OTPSchema;

export type GenerateOTPResponse = z.infer<typeof generateOTPResponseSchema>;
export const verifyOTPDataSchema = z.object({
  verified: z.boolean(),
  email: z.email(),
});
export const verifyOTPResponseSchema = verifyOTPDataSchema;

export type VerifyOTPResponse = z.infer<typeof verifyOTPResponseSchema>;

export const verifyUserSchema = z.object({
  verified: z.boolean(),
});

export const VerifyUserResponseSchema = verifyUserSchema;
export type VerifyUserResponse = z.infer<typeof VerifyUserResponseSchema>;
