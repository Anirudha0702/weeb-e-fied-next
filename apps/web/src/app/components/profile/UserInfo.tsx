import { updateUserInfoSchema, type UpdateUserForm } from "@/app/types/types";
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
import { useState } from "react";
import * as z from "zod";
interface UserInfoProps {
  email: string;
  username: string;
  name: string;
  bio?: string;
  dob?: string;
  gender?: "Male" | "Female" | "Others";
  disabled: boolean;
  onSaveChange: (val: UpdateUserForm) => void;
}

function UserInfo({
  email,
  username,
  name,
  bio,
  dob,
  gender,
  disabled,
  onSaveChange,
}: UserInfoProps) {
  const [wannaChangePassword, setWannaChangePassword] = useState(false);
  const [show, setShow] = useState({
    password: false,
    currentPassword: false,
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
  const form = useForm({
    defaultValues: {
      email: email,
      userName: username,
      name: name || "",
      dob: dob,
      gender: gender,
      bio: bio,
      password: "",
      currentpassword: "",
    },
    validators: {
      onChange: ({ value }) => {
        const result = updateUserInfoSchema.safeParse(value);

        if (!result.success) {
          return z.treeifyError(result.error);
        }
      },
    },
    onSubmit: ({ value }) => onSaveChange(value),
  });

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
              <FieldLabel htmlFor="email" className="mb-2">
                Name
              </FieldLabel>
              <Input
                className="border p-2 w-full"
                placeholder="Name"
                value={field.state.value}
                disabled={disabled}
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
          name="bio"
          children={(field) => (
            <div className="mb-2">
              <FieldLabel htmlFor="email" className="mb-2">
                Bio
              </FieldLabel>

              <Textarea
                rows={3}
                disabled={disabled}
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
              <FieldLabel htmlFor="email" className="mb-2">
                Date of Birth
              </FieldLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    disabled={disabled}
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
              name="currentpassword"
              children={(field) => (
                <div className="mb-2">
                  <FieldLabel htmlFor="email" className="mb-2">
                    Current Password
                  </FieldLabel>
                  <div className="flex items-center gap-2">
                    <Input
                      disabled={disabled}
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
                    <p className="text-red-500 text-sm">
                      {field.state.meta.errors.join(",")}
                    </p>
                  )}
                </div>
              )}
            />
            <form.Field
              name="password"
              children={(field) => (
                <div className="mb-2">
                  <FieldLabel htmlFor="email" className="mb-2">
                    New Password
                  </FieldLabel>
                  <div className="flex items-center gap-2">
                    <Input
                      type={show.password ? "text" : "password"}
                      placeholder="Enter current password"
                      value={field.state.value}
                      disabled={disabled}
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
                  {!field.state.meta.isValid && (
                    <p className="text-red-500 text-sm">
                      {field.state.meta.errors.join(",")}
                    </p>
                  )}
                </div>
              )}
            />
          </>
        )}
        <div className="flex justify-end mt-3">
          <Button type="submit" className="w-28" disabled={disabled}>
            {disabled ? <Loader className="animate-spin" /> : "Save changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UserInfo;
