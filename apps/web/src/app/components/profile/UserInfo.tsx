import { ProfileContext } from "@/app/context/ProfileContext";
import { UpdateUserFormSchema, type UpdateUserForm } from "@/app/types/types";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useForm } from "@tanstack/react-form";
import { CalendarIcon, Eye, EyeClosed, Loader } from "lucide-react";
import { useContext, useState } from "react";
interface UserInfoProps {
  email: string;
  username: string;
}

function UserInfo({ email, username }: UserInfoProps) {
  const [wannaChangePassword, setWannaChangePassword] = useState(false);
  const context = useContext(ProfileContext);
  const [show, setShow] = useState({
    password: false,
    currentPassword: false,
  });

  const form = useForm({
    defaultValues: {
      email: email,
      userName: username,
      name: context?.profile?.name || "",
      dob: context?.profile?.dob ?? undefined,
      gender: context?.profile?.gender,
      bio: context?.profile?.bio,
      newPassword: undefined,
      currentPassword: undefined,
    } as UpdateUserForm & { email: string; userName: string },
    validators: {
      onChange: UpdateUserFormSchema,
    },
    onSubmit: ({ value }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { email, userName, ...rest } = value;
      context?.updateProfile(rest);
    },
  });

  const changeVisiblity = (e: React.MouseEvent<SVGSVGElement>) => {
    const visibility = e.currentTarget.dataset.visiblity as
      | "show"
      | "hide"
      | undefined;
    const type = e.currentTarget.dataset.type as
      | "password"
      | "curr-password"
      | undefined;
    if (!visibility || !type) return;
    const key = type === "curr-password" ? "currentPassword" : "password";
    setShow((prev) => ({
      ...prev,
      [key]: visibility === "show",
    }));
  };

  const handlePasswordChangeClick = () =>
    setWannaChangePassword(!wannaChangePassword);
  if (!context || !context?.profile) return null;
  return (
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
                className="border p-2 w-full "
                placeholder="Email"
                defaultValue={field.state.value}
                disabled
              />
            </div>
          )}
        />
        <form.Field
          name="userName"
          children={(field) => (
            <div className="mb-2">
              <FieldLabel htmlFor="username" className="mb-2">
                Username
              </FieldLabel>
              <Input
                id="username"
                className="border p-2 w-full"
                placeholder="Email"
                defaultValue={field.state.value}
                disabled
              />
              {!field.state.meta.isValid && (
                <p className="text-red-500 text-sm">
                  {field.state.meta.errors.join(",")}
                </p>
              )}
            </div>
          )}
        />
        <form.Field
          name="name"
          children={(field) => (
            <div className="mb-2">
              <FieldLabel htmlFor="name" className="mb-2">
                Name
              </FieldLabel>
              <Input
                id="name"
                className="border p-2 w-full"
                placeholder="Name"
                value={field.state.value}
                disabled={context?.loading}
                onChange={(e) => field.handleChange(e.target.value)}
              />

              {field.state.meta.errors.length > 0 && (
                <>
                  <p className="text-red-500 text-sm">
                    {field.state.meta.errors
                      .map((err) => err?.message)
                      .join(", ")}
                  </p>
                </>
              )}
            </div>
          )}
        />
        <form.Field
          name="bio"
          children={(field) => (
            <div className="mb-2">
              <FieldLabel htmlFor="bio" className="mb-2">
                Bio
              </FieldLabel>

              <Textarea
                id="bio"
                rows={3}
                disabled={context?.loading}
                placeholder="About yourself..."
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {!field.state.meta.isValid && (
                <p className="text-red-500 text-sm">
                  {field.state.meta.errors.join(",")}
                </p>
              )}
            </div>
          )}
        />

        <form.Field
          name="dob"
          children={(field) => (
            <div className="mb-2">
              <FieldLabel htmlFor="dob" className="mb-2">
                Date of Birth
              </FieldLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="dob"
                    disabled={context?.loading}
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal cursor-pointer",
                      !field.state.value && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.state.value
                      ? new Date(field.state.value).toDateString()
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0">
                  <Calendar
                    mode="single"
                    selected={field.state.value as Date | undefined}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      field.handleChange(date?.toDateString());
                    }}
                    disabled={(d) => d > new Date()}
                  />
                </PopoverContent>
              </Popover>
              {!field.state.meta.isValid && (
                <p className="text-red-500 text-sm">
                  {field.state.meta.errors.join(",")}
                </p>
              )}
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
              name="currentPassword"
              children={(field) => (
                <div className="mb-2">
                  <FieldLabel htmlFor="curr-password" className="mb-2">
                    Current Password
                  </FieldLabel>
                  <div className="flex items-center gap-2">
                    <Input
                      id="curr-password"
                      disabled={context?.loading}
                      type={show.currentPassword ? "text" : "password"}
                      placeholder="Enter current password"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />

                    {!show.currentPassword ? (
                      <EyeClosed
                        data-visiblity="show"
                        data-type="curr-password"
                        onClick={changeVisiblity}
                        className="cursor-pointer"
                      />
                    ) : (
                      <Eye
                        data-visiblity="hide"
                        data-type="curr-password"
                        onClick={changeVisiblity}
                        className="cursor-pointer"
                      />
                    )}
                  </div>

                  {field.state.meta.errors.length > 0 && (
                    <>
                      <p className="text-red-500 text-sm">
                        {field.state.meta.errors
                          .map((err) => err?.message)
                          .join(", ")}
                      </p>
                    </>
                  )}
                </div>
              )}
            />
            <form.Field
              name="newPassword"
              children={(field) => (
                <div className="mb-2">
                  <FieldLabel htmlFor="password" className="mb-2">
                    New Password
                  </FieldLabel>
                  <div className="flex items-center gap-2">
                    <Input
                      id="password"
                      type={show.password ? "text" : "password"}
                      placeholder="Enter current password"
                      value={field.state.value}
                      disabled={context?.loading}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />

                    {!show.password ? (
                      <EyeClosed
                        onClick={changeVisiblity}
                        data-visiblity="show"
                        data-type="password"
                        className="cursor-pointer"
                      />
                    ) : (
                      <Eye
                        data-visiblity="hide"
                        data-type="password"
                        onClick={changeVisiblity}
                        className="cursor-pointer"
                      />
                    )}
                  </div>
                  {field.state.meta.errors.length > 0 && (
                    <>
                      <p className="text-red-500 text-sm">
                        {field.state.meta.errors
                          .map((err) => err?.message)
                          .join(", ")}
                      </p>
                    </>
                  )}
                </div>
              )}
            />
          </>
        )}
        <div className="flex justify-end mt-3">
          <form.Subscribe
            selector={(state) => [
              state.canSubmit,
              state.isSubmitting,
              state.isDirty,
            ]}
            children={([canSubmit, isSubmitting, isDirty]) => (
              <Button
                type="submit"
                className="w-28 cursor-pointer"
                disabled={
                  !isDirty || !canSubmit || context.loading || isSubmitting
                }
              >
                {context.loading ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Save changes"
                )}
              </Button>
            )}
          />
        </div>
      </form>
    </div>
  );
}

export default UserInfo;
