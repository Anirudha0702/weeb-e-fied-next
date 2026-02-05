import * as z from "zod";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import OAuthButtons from "../OAuthButtons";
import { useApiMutation } from "@/app/hooks/useApi";
import {
  loginResponseSchema,
  type ApiError,
  type LoginResponse,
} from "@/app/types/api";
import useAuthStore from "@/app/store/authStore";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
const loginFormSchema = z.object({
  email: z.email(),
  password: z.string(),
});
type loginTypes = z.infer<typeof loginFormSchema>;
function Login() {
  const { setAuth } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const mutation = useApiMutation<LoginResponse, loginTypes>(
    {
      endpoint: "/auth/login",
      method: "POST",
      payloadSchema: loginFormSchema,
      responseSchema: loginResponseSchema,
    },
    {
      onSuccess: (data) => {
        const { user, accessToken } = data;

        setAuth({
          token: accessToken,
          user: {
            name: user.name,
            id: user.id,
            email: user.email,
            profilePicture: user.profilePicture ?? null,
            coverPicture: user.coverPicture ?? null,
          },
        });
        toast.success("Login successful!");
      },
      onError: (error: ApiError) => {
        toast.error(error.message || "Login failed. Please try again.");
        console.log(error);
      },
    },
  );
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginFormSchema,
    },
    onSubmit: ({ value }) => {
      mutation.mutate(value);
    },
  });
  const setVisiblity = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-4 w-full max-w-md  mb-0"
    >
      <form.Field
        name="email"
        children={(field) => (
          <div>
            <input
              className="border p-2 w-full"
              placeholder="Email"
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
        name="password"
        children={(field) => (
          // <div>
          //   <input
          //     type="password"
          //     className="border p-2 w-full"
          //     placeholder="Password"
          //     value={field.state.value}
          //     onChange={(e) => field.handleChange(e.target.value)}
          //   />
          //   {field.state.meta.errors?.length ? (
          //     <p className="text-red-500 text-sm">
          //       {field.state.meta.errors[0]?.message}
          //     </p>
          //   ) : null}
          // </div>
          <div>
            <div className="flex items-center gap-2 border focus-within:outline-2 focus-within:outline-white rounded-xs focus-within:border-2 focus-within:border-primary cursor-pointer">
              <input
                type={showPassword ? "text" : "password"}
                className="border p-2 w-full border-none focus:border-none focus:outline-none"
                placeholder="Password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <div className="mr-2" onClick={() => setVisiblity()}>
                {showPassword ? <Eye size={16} /> : <EyeClosed size={16} />}
              </div>
            </div>
            {field.state.meta.errors?.length ? (
              <p className="text-red-500 text-sm">
                {field.state.meta.errors[0]?.message}
              </p>
            ) : null}
          </div>
        )}
      />

      <Button
        type="submit"
        className=" px-4 py-2 rounded w-full cursor-pointer"
      >
        Login
      </Button>
      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-card text-muted-foreground relative z-10 px-2">
          Or continue with
        </span>
      </div>
      <OAuthButtons disabled />
    </form>
  );
}

export default Login;
