import { createContext, useContext } from "react";
import type { UpdateUser } from "../types/types";
export type TProfile = {
    name?: string | undefined;
    dob?: string | undefined;
    gender?: "Male" | "Female" | "Others" | undefined;
    bio?: string | undefined;
    password?: string | undefined;
    currentpassword?: string | undefined;
    profilePicture?: File;
    coverPicture?: File ;
}
interface ProfileContextType {
  profile:TProfile | null;
  loading: boolean;
  updateProfile: (data: Partial<UpdateUser>) => Promise<void>;
}

export const ProfileContext = createContext<ProfileContextType | undefined>(
  undefined,
);

export function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfile must be used inside ProfileProvider");
  }

  return context;
}
