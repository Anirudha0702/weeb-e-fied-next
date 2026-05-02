import * as z from "zod";
import { comment } from "./types";

export interface ApiConfig<TResponse, TPayload = undefined> {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  queryParams?: Record<string, string | number | boolean>;
  payload?: TPayload;
  responseSchema?: z.ZodSchema<TResponse>;
  payloadSchema?: z.ZodSchema<TPayload>;
  key: string[];
  enable?: boolean;
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
const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  profilePicture: z.string(),
  coverPicture: z.string(),
  bio: z.string().nullable(),
  dateOfBirth: z.coerce.date().nullable(),
  gender: z.literal(["Male", "Female", "Others"]).nullable(),
  username: z.string(),
  isVerified: z.boolean(),
  isBlocked: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  lastLogin: z.coerce.date().nullable(),
});
// Register Endpoint API Type
export const registerDataSchema = z.object({
  user: userSchema,
});

// Composed Endpoint Schemas
export const registerResponseSchema = userSchema;

//Inferred Types
export type RegisterResponse = z.infer<typeof registerResponseSchema>;
export type UserInfoResposne = z.infer<typeof registerDataSchema>;
export const loginDataSchema = z.object({
  user: userSchema,
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
export const updateUserDataSchema = z.object({
  user: userSchema,
});

export const updateResponseSchema = updateUserDataSchema;

export type UpdateUserResponse = z.infer<typeof updateResponseSchema>;
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

export const commentWithUserLike = comment.extend({
  user: z.object({
    id: z.uuid(),
    name: z.string(),
    profilePicture: z.string(),
  }),
  likeCount: z.number(),
  likedByCurrentUser: z.boolean(),
});

export type TcommentWithUserLike = z.infer<typeof commentWithUserLike>;
export const allCommentsResponseSchema = z.object({
  comments: z.array(commentWithUserLike),
  nextCursor: z.string().nullable(),
  hasNextPage: z.boolean(),
});
export type TAllCommentsResponse = z.infer<typeof allCommentsResponseSchema>;

export const watchlistSchema = z.object({
  mediaId: z.number(),
  status: z.enum(["watching", "completed", "on-hold", "planned", "dropped"]),
  remove: z.boolean().optional(),
});
export type TWatchlist = z.infer<typeof watchlistSchema>;
