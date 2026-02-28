import { Button } from "@/components/ui/button";
import useAuthStore from "../store/authStore";
import { CalendarIcon, Loader, PenLine, UserPen } from "lucide-react";
import { useApi, useApiMutation } from "../hooks/useApi";
import { toast } from "sonner";
import * as z from "zod";
import { Calendar } from "@/components/ui/calendar";
import {
  updateResponseSchema,
  type ApiError,
  type UpdateUserResponse,
  type UserInfoResposne,
} from "../types/api";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
type ProfileFormValues = {
  email?: string;
  userName?: string;
  name: string;
  dob?: string;
  gender?: "Male" | "Female" | "Others";
  bio?: string;
  password?: string;
  currentpassword?: string;
};
function ProfilePage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [wannaChangePassword, setWannaChangePassword] = useState(false);
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
  const form = useForm<ProfileFormValues>({
    defaultValues: {
      email: info?.user.email,
      userName: info?.user.username,
      name: info?.user.name || "",
      dob: info?.user.dateOfBirth
        ? info?.user.dateOfBirth.toDateString()
        : undefined,
      gender: info?.user.gender || undefined,
      bio: info?.user.bio || undefined,
      password: undefined,
      currentpassword: undefined,
    },
  });
  const handlePasswordChangeClick = () =>
    setWannaChangePassword(!wannaChangePassword);
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
      <div className="relative mb-4">
        <img
          src={user.coverPicture || "/images/bg_cover_default.svg"}
          alt="Cover"
          className="w-full h-56 object-cover rounded-lg"
        />
        <Button className={`absolute top-2 right-2 cursor-pointer`}>
          Edit <PenLine />
        </Button>
      </div>
      <div className="">
        <span className="flex gap-4 items-center text-2xl ml-4">
          <UserPen size={40} /> Edit Profile
        </span>
        <div className="flex max-w-3xl  mx-auto bg-muted  rounded-md flex-col sm:flex-row">
          <div className="order-2 sm:order-1 w-full sm:bg-background/60 p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              <form.Field
                name="email"
                children={(field) => (
                  <div className="mb-2">
                    <FieldLabel htmlFor="email" className="mb-2">
                      Email
                    </FieldLabel>
                    <Input
                      id="email"
                      className="border p-2 w-full"
                      placeholder="Email"
                      value={field.state.value}
                      disabled
                    />
                  </div>
                )}
              />
              <form.Field
                name="userName"
                children={(field) => (
                  <div className="mb-2">
                    <FieldLabel htmlFor="email" className="mb-2">
                      Username
                    </FieldLabel>
                    <Input
                      id="email"
                      className="border p-2 w-full"
                      placeholder="Email"
                      value={field.state.value}
                      disabled
                    />
                  </div>
                )}
              />
              <form.Field
                name="name"
                children={(field) => (
                  <div className="mb-2">
                    <FieldLabel htmlFor="email" className="mb-2">
                      Name
                    </FieldLabel>
                    <Input
                      className="border p-2 w-full"
                      placeholder="Name"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors?.length ? (
                      <p className="text-red-500 text-sm">
                        {field.state.meta.errors[0]?.message}
                      </p>
                    ) : null}
                  </div>
                )}
              />
              <form.Field
                name="bio"
                children={(field) => (
                  <div className="mb-2">
                    <FieldLabel htmlFor="email" className="mb-2">
                      Bio
                    </FieldLabel>

                    <Textarea
                      rows={3}
                      placeholder="About yourself..."
                      value={field.state.value}
                      disabled={updateProfile.isPending}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors?.length ? (
                      <p className="text-red-500 text-sm">
                        {field.state.meta.errors[0]?.message}
                      </p>
                    ) : null}
                  </div>
                )}
              />

              <form.Field
                name="dob"
                children={(field) => (
                  <div className="mb-2">
                    <FieldLabel htmlFor="email" className="mb-2">
                      Date of Birth
                    </FieldLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.state.value && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.state.value
                            ? field.state.value.toString()
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="p-0">
                        <Calendar
                          mode="single"
                          selected={field.state.value as Date | undefined}
                          captionLayout="dropdown"
                          onSelect={(date) => {
                            setDate(date);
                            field.handleChange(date?.toDateString());
                          }}
                          disabled={(d) => d > new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                    {field.state.meta.errors?.length ? (
                      <p className="text-red-500 text-sm">
                        {field.state.meta.errors[0]?.message}
                      </p>
                    ) : null}
                  </div>
                )}
              />

              <span
                className="underline  text-sm cursor-pointer mb-2 block"
                onClick={handlePasswordChangeClick}
              >
                {wannaChangePassword
                  ? "Dont want to change password?"
                  : "Change password?"}
              </span>
              {wannaChangePassword && (
                <>
                  <form.Field
                    name="currentpassword"
                    children={(field) => (
                      <div className="mb-2">
                        <FieldLabel htmlFor="email" className="mb-2">
                          Current Password
                        </FieldLabel>
                        <Input
                          type="password"
                          placeholder="Enter current password"
                          value={field.state.value}
                          disabled={updateProfile.isPending}
                        />
                      </div>
                    )}
                  />
                  <form.Field
                    name="password"
                    children={( field ) => (
                       <div className="mb-2">
                        <FieldLabel htmlFor="email" className="mb-2">
                          New Password
                        </FieldLabel>
                        <Input
                          type="password"
                          placeholder="Enter current password"
                          value={field.state.value}
                          disabled={updateProfile.isPending}
                        />
                      </div>
                    )}
                  />
                </>
              )}
              <div className="flex justify-end mt-3">
                <Button
                  type="submit"
                  className="w-28"
                  disabled={updateProfile.isPending}
                >
                  {updateProfile.isPending ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Save changes"
                  )}
                </Button>
              </div>
            </form>
          </div>
          <div className="w-52 shrink-0 order-1 sm:order-2 mx-auto sm:mx-0 p-4">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-muted/60 border cursor-pointer mx-auto">
              <img
                src={user.profilePicture}
                alt="profile"
                className="object-cover absolute top-0 left-0 w-full h-full"
              />
            </div>
            <div className="flex justify-center mt-2">
              <Button className="h-7 flex items-center gap-2 cursor-pointer">
                Edit <PenLine />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
