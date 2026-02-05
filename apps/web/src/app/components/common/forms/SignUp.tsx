import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import OAuthButtons from "../OAuthButtons";
import { useRef, useState } from "react";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/app/hooks/useApi";
import {
  generateOTPResponseSchema,
  loginResponseSchema,
  registerResponseSchema,
  verifyOTPResponseSchema,
  type ApiError,
  type GenerateOTPResponse,
  type LoginResponse,
  type RegisterResponse,
  type VerifyOTPResponse,
} from "@/app/types/api";
import useAuthStore from "@/app/store/authStore";

const signupFormSchema = z
  .object({
    email: z.email("Invalid email address."),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long.")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?`~]).+$/,
        {
          message:
            "Password must include at least one letter, one number, and one special character.",
        },
      ),

    name: z.string(),
    otp: z.string(),
    confirmpassword: z.string().min(6, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match.",
    path: ["confirmpassword"],
  });
const signupBaseSchema = z.object({
  email: z.email("Invalid email address."),
  password: z
    .string()
    .min(6)
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?`~]).+$/,
      {
        message:
          "Password must include at least one letter, one number, and one special character.",
      },
    ),
  name: z.string(),
  verified: z.boolean().optional(),
});

type SignupFormType = z.infer<typeof signupFormSchema>;
const otpFormSchema = z.object({
  email: z.email("Please enter a valid email"),
  name: z.string().optional(),
});

type OtpFormType = z.infer<typeof otpFormSchema>;

const otpVerifySchema = z.object({
  email: z.email("Please enter a valid email"),
  otp: z.string().length(6, "OTP must be 6 characters"),
});
type OtpVerifyType = z.infer<typeof otpVerifySchema>;

const loginFormSchema = z.object({
  email: z.email(),
  password: z.string(),
});
type loginTypes = z.infer<typeof loginFormSchema>;
function SignUp() {
  const { setAuth } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const debounceTimeoutRef = useRef<number | null>(null);

  const login = useApiMutation<LoginResponse, loginTypes>(
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

  const mutation = useApiMutation<
    RegisterResponse,
    Omit<SignupFormType, "confirmpassword" | "otp"> & {
      verified?: boolean;
    }
  >(
    {
      endpoint: "/auth/signup",
      method: "POST",
      payloadSchema: signupBaseSchema,
      responseSchema: registerResponseSchema,
    },
    {
      onSuccess: (data) => {
        login.mutate({
          email: data.email,
          password: form.getFieldValue("password"),
        });
      },
      onError: (error: ApiError) => {
        toast.error(error.message || "Registration failed. Please try again.");
      },
    },
  );
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmpassword: "",
      name: "",
      otp: "",
    },
    validators: {
      onSubmit: signupFormSchema,
    },
    onSubmit: async ({ value }) => {
      mutation.mutate({
        email: value.email,
        password: value.password,
        name: value.name,
        verified: otpVerified,
      });
    },
  });

  const sendOtpMutation = useApiMutation<GenerateOTPResponse, OtpFormType>(
    {
      endpoint: "/otp/generate",
      method: "POST",
      payloadSchema: otpFormSchema,
      responseSchema: generateOTPResponseSchema,
    },
    {
      onSuccess: () => {
        toast.success("OTP sent successfully!");
        setOtpSent(true);
      },
      onError: (error: ApiError) => {
        toast.error(error.message || "Failed to send OTP");
      },
    },
  );
  const verifyOtpMutation = useApiMutation<VerifyOTPResponse, OtpVerifyType>(
    {
      endpoint: "/otp/verify",
      method: "POST",
      payloadSchema: otpVerifySchema,
      responseSchema: verifyOTPResponseSchema,
    },
    {
      onSuccess: () => {
        toast.success("OTP verified!");
        setOtpVerified(true);
        setOtpSent(false);
        form.setFieldValue("otp", "");
      },
      onError: (error: ApiError) => {
        toast.error(error.message || "Invalid OTP, please try again.");
      },
    },
  );
  const setVisiblity = (type: "password" | "confirmPassword") => {
    if (type === "password") setShowPassword(!showPassword);
    else setConfirmPassword(!confirmPassword);
  };
  function debounceVerifyOtp(otp: string, email: string) {
    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);

    if (!/^[A-Za-z0-9]{6}$/.test(otp) || otp.length !== 6) return;
    debounceTimeoutRef.current = setTimeout(() => {
      verifyOtpMutation.mutate({
        email,
        otp,
      });
    }, 2000);
  }
  function handleEditEmail() {
    setOtpSent(false);
    setOtpVerified(false);
    form.setFieldValue("otp", "");
    form.setFieldValue("email", "");
  }
  const disableFields = () => {
    return (
      sendOtpMutation.isPending ||
      verifyOtpMutation.isPending ||
      mutation.isPending ||
      login.isPending
    );
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
        name="name"
        children={(field) => (
          <div>
            <input
              type="text"
              className="border p-2 w-full"
              placeholder=" Jhon Doe"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              disabled={disableFields()}
            />
            {field.state.meta.errors?.length ? (
              <p className="text-red-500 text-sm">
                {field.state.meta.errors[0]?.message}
              </p>
            ) : null}
          </div>
        )}
      />
      {!otpSent && (
        <form.Field
          name="email"
          children={(field) => (
            <div>
              <input
                disabled={disableFields()}
                readOnly={otpVerified}
                className="border p-2 w-full"
                placeholder="jhondoe@gmail.com"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={() => {
                  if (otpVerified || !field.state.value || otpSent) return;
                  sendOtpMutation.mutate({
                    email: field.state.value,
                    name: form.getFieldValue("name"),
                  });
                }}
              />
              {sendOtpMutation.isPending && (
                <div className="absolute inset-y-0 right-3 flex items-center">
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                </div>
              )}
              {otpVerified && (
                <span
                  className="text-primary hover:underline font-medium text-sm cursor-pointer inline-block"
                  onClick={handleEditEmail}
                >
                  Edit Email?
                </span>
              )}
              {field.state.meta.errors?.length ? (
                <p className="text-red-500 text-sm">
                  {field.state.meta.errors[0]?.message}
                </p>
              ) : null}
            </div>
          )}
        />
      )}
      {otpSent && !otpVerified && (
        <form.Field
          name="otp"
          children={(field) => (
            <div>
              <input
                disabled={disableFields()}
                className="border p-2 w-full"
                placeholder="Enter the OTP"
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                  debounceVerifyOtp(
                    e.target.value,
                    form.getFieldValue("email"),
                  );
                }}
              />
              {field.state.meta.errors?.length ? (
                <p className="text-red-500 text-sm">
                  {field.state.meta.errors[0]?.message}
                </p>
              ) : null}
            </div>
          )}
        />
      )}
      <form.Field
        name="password"
        children={(field) => (
          <div>
            <div className="flex items-center gap-2 border focus-within:outline-2 focus-within:outline-white rounded-xs focus-within:border-2 focus-within:border-primary cursor-pointer">
              <input
                disabled={disableFields()}
                type={showPassword ? "text" : "password"}
                className="border p-2 w-full border-none focus:border-none focus:outline-none"
                placeholder="Password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <div className="mr-2" onClick={() => setVisiblity("password")}>
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
      <form.Field
        name="confirmpassword"
        children={(field) => (
          <div>
            <div className="flex items-center gap-2 border focus-within:outline-2 focus-within:outline-white rounded-xs focus-within:border-2 focus-within:border-primary">
              <input
                disabled={disableFields()}
                type={confirmPassword ? "text" : "password"}
                className="border p-2 w-full border-none focus:border-none focus:outline-none"
                placeholder="Re-enter password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <div
                className="mr-2 cursor-pointer"
                onClick={() => setVisiblity("confirmPassword")}
              >
                {confirmPassword ? <Eye size={16} /> : <EyeClosed size={16} />}
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
        disabled={disableFields() || !otpVerified}
        type="submit"
        className=" px-4 py-2 rounded w-full cursor-pointer"
      >
        Sign up
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

export default SignUp;
