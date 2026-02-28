import * as z from "zod";

export type TSeason = "WINTER" | "SPRING" | "SUMMER" | "FALL";
export type TStatus =
  | "RELEASING"
  | "NOT_YET_RELEASED"
  | "CANCELLED"
  | "FINISHED"
  | "HIATUS";
export type TMediaTitle = {
  english: string;
  native: string;
  romaji: string;
  userPreferred: string;
};
export type TCoverImage = {
  color: string;
  medium: string;
  large: string;
  extraLarge: string;
};
export type TWatchListOptions =
  | "watching"
  | "completed"
  | "onHold"
  | "dropped"
  | "planToWatch"
  | "remove";

export const comment = z.object({
  id: z.uuid(),
  content: z.string(),
  gif: z.string().nullable(),
  postId: z.uuid().nullable(),
  episodeId: z.string().nullable(),
  parentId: z.string().nullable(),
  userId: z.uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  replyCount:z.number(),
});

export type TComment=z.infer<typeof comment>

export const UpdateUserFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  dob: z.string().optional(),
  gender: z.enum(["Male", "Female", "Other"]).optional(),

  bio: z.string().max(160, "Bio must be at most 100 characters").optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
  currentpassword: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
  profilePicture: z
    .custom<File>((val) => val instanceof File, {
      message: "Please upload a valid file",
    })
    .refine(
      (file) => !file || file.size <= 1.5 * 1024 * 1024,
      "Max 1.5MB allowed"
    )
    .refine(
      (file) => !file || ["image/jpeg", "image/png"].includes(file.type),
      "Only JPG/PNG allowed"
    )
    .optional(),

  coverPicture: z
    .custom<File>((val) => val instanceof File, {
      message: "Please upload a valid file",
    })
    .refine((file) => !file || file.size <= 3 * 1024 * 1024, "Max 3MB allowed")
    .refine(
      (file) => !file || ["image/jpeg", "image/png"].includes(file.type),
      "Only JPG/PNG allowed"
    )
    .optional(),
});

export type UpdateUser = z.infer<typeof UpdateUserFormSchema>;