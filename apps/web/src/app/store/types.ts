import { z } from "zod";

// Your existing Zod schemas
export const authUser = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  dob: z.string().or(z.undefined()),
  gender: z.enum(["Male", "Female", "Others"]).nullable(),
  bio: z.string().nullable(),
  profilePicture: z.string(),
  coverPicture: z.string(),
});

export const auth = z.object({
  token: z.string().nullable(),
  user: authUser.nullable(),
});

export type Auth = z.infer<typeof auth>;
export type AuthUser = z.infer<typeof authUser>;

// Zustand store type
export type AuthStore = {
  token: string | null;
  user: AuthUser | null;
  setAuth: (auth: Auth) => void;
  clearAuth: () => void;
  setToken: (token: string) => void;
  setUser: (user: AuthUser) => void;
};
