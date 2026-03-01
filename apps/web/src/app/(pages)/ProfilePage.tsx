import { Button } from "@/components/ui/button";
import useAuthStore from "../store/authStore";
import {  UserPen } from "lucide-react";
import { useApi, useApiMutation} from "../hooks/useApi";
import {

  updateResponseSchema,
  type ApiError,
  type UpdateUserResponse,
  type UserInfoResposne,
} from "../types/api";
import { useNavigate } from "@tanstack/react-router";

import CoverImage from "../components/profile/coverImage";
import ProfileImage from "../components/profile/ProfileImage";
import UserInfo from "../components/profile/UserInfo";
import { toast } from "sonner";

function ProfilePage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const {
    data: info,
    isLoading,
    isError,
  } = useApi<UserInfoResposne>({
    endpoint: "/users/info",
    method: "GET",
    key: ["user-info", user?.id ?? ""],
  });
  const updateProfile = useApiMutation<UpdateUserResponse, FormData>(
      {
        endpoint: `/users/update`,
        method: "PATCH",
        responseSchema: updateResponseSchema,
        key: ["update-profile"],
      },
      {
        onSuccess: () => {
          toast.success("Updated successsfully");
        },
        onError: (error: ApiError) => {
          toast.error(error.message || "Login failed. Please try again.");
          console.log(error);
        },
      },
    );

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center w-full shrink-0 ">
        <div className="flex gap-2">
          <span className="loader-bar delay-0" />
          <span className="loader-bar delay-150" />
          <span className="loader-bar delay-300" />
        </div>
      </div>
    );
  if (isError || !info || !user)
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <img
            src="/images/error-loli-xs.gif"
            className=" h-32 aspect-square mx-auto"
          />
          <h2 className="text-xl font-semibold text-primary">
            Failed to load anime
          </h2>
          <p className="mt-2 text-sm text-secondary">
            Something went wrong while fetching anime details. Please try again
            later.
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <Button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-md bg-black text-white text-sm hover:bg-gray-800 transition"
            >
              Retry
            </Button>

            <Button
              onClick={() =>
                navigate({
                  to: "/home",
                })
              }
              className="px-4 py-2 rounded-md border text-sm hover:bg-gray-50 transition"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  return (
    <div className="mt-20">
      <CoverImage src={user.coverPicture} onEdit={() => {}} />
      <div className="">
        <span className="flex gap-4 items-center text-2xl  max-w-3xl  mx-auto my-4">
          <UserPen size={40} /> Edit Profile
        </span>
        <div className="flex max-w-3xl  mx-auto bg-muted  rounded-md flex-col sm:flex-row">
          <UserInfo
            email={info.user.email}
            name={info.user.name}
            username={info.user.username}
            gender={info.user.gender??undefined}
            bio={info.user.bio??''}
            dob={info.user.dateOfBirth?.toDateString()}
            disabled={updateProfile.isPending}
            onSaveChange={() => {}}
          />
          <ProfileImage src={user.profilePicture} onEdit={() => {}} />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
