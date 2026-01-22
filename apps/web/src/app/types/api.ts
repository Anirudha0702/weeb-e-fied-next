import {  z } from "zod";

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
