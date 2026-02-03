import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import OAuthButtons from "../OAuthButtons";

const signupFormSchema = z.object({
  email: z.email(),
  password: z.string(),
  fullname: z.string(),
});

function SignUp() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      fullname: "",
    },
    validators: {
      onSubmit: signupFormSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("Submitted:", value);
    },
  });
  return (
    <form
      onSubmit={form.handleSubmit}
      className="space-y-4 w-full max-w-md  mb-0"
    >
      <form.Field
        name="email"
        children={(field) => (
          <div>
            <input
              className="border p-2 w-full"
              placeholder="jhondoe@gmail.com"
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
        name="fullname"
        children={(field) => (
          <div>
            <input
              type="text"
              className="border p-2 w-full"
              placeholder=" Jhon Doe"
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
          <div>
            <input
              type="password"
              className="border p-2 w-full"
              placeholder="Password"
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

      <Button
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
      <OAuthButtons />
    </form>
  );
}

export default SignUp;
