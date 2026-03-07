import { ProfileContext, type TProfile } from "@/app/context/ProfileContext";
import { useApiMutation } from "@/app/hooks/useApi";
import useAuthStore from "@/app/store/authStore";
import {
  updateResponseSchema,
  type ApiError,
  type UpdateUserResponse,
} from "@/app/types/api";

import { toast } from "sonner";

function ProfileContextProvider({ children }: { children: React.ReactNode }) {
  const { user, setUser } = useAuthStore();

  const profileMutation = useApiMutation<UpdateUserResponse, FormData>(
    {
      endpoint: `/users/update`,
      method: "PATCH",
      responseSchema: updateResponseSchema,
      key: ["update-profile"],
    },
    {
      onSuccess: (data) => {
        setUser({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          username: data.user.username,
          dob: data.user.dateOfBirth?.toISOString(),
          bio: data.user.bio,
          gender: data.user.gender,
          profilePicture: data.user.profilePicture,
          coverPicture: data.user.coverPicture,
        });
        toast.success("Updated successsfully");
      },
      onError: (error: ApiError) => {
        toast.error(error.message || "Login failed. Please try again.");
        console.log(error);
      },
    },
  );
  if (!user) return null;

  const value = {
    profile: {
      name: user.name,
      dob: user.dob,
      gender: user.gender ?? undefined,
      bio: user.bio ?? undefined,
      password: undefined,
      currentpassword: undefined,
    },
    loading: profileMutation.isPending,
    updateProfile: async (data: Partial<TProfile>) => {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value as string | Blob);
        }
      });

      await profileMutation.mutateAsync(formData);
    },
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}
export default ProfileContextProvider;
