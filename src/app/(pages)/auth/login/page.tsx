"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AuthHeader from "@/app/components/AuthHeader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const page = () => {
  const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(12),
  });
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    fetch("/api/verifyMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        console.log("Email sent successfully");
      } else {
        console.log("Error sending email");
      }
    });
  }
  return (
    <div className=" relative w-full lg:w-[60svw]  min-h-screen flex flex-col ">
      {/* AuthHeader at the top */}
      <div className="absolute inset-0 bg-[white]/50 backdrop-blur-lg"></div>
      <AuthHeader sx="absolute top-0 left-0 w-full p-4" />

      {/* Centered Form Container */}
      <div className="z-10 flex flex-col justify-center items-center space-y-8 mx-auto  flex-1 w-full p-4">
        <div className="w-full flex flex-col justify-center items-center ">
          Login
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full max-w-md px-4 mb-0"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[hsl(222.2_84%_4.9%)]">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        className="text-[hsl(222.2_84%_4.9%)] outline-[hsl(222.2_84%_4.9%)] border-[hsl(222.2_84%_4.9%)] bg-transparent"
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage className="text-[hsl(222.2_84%_4.9%)]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[hsl(222.2_84%_4.9%)]">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        {...field}
                        className="text-[hsl(222.2_84%_4.9%)] outline-[hsl(222.2_84%_4.9%)] border-[hsl(222.2_84%_4.9%)] bg-transparent"
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage className="text-[hsl(222.2_84%_4.9%)]" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="relative w-full  before:flex before:items-center before:justify-center text-white 
  bg-gradient-to-r from-[rgb(152,239,250)] to-[rgb(20,131,228)] transition-all duration-300 ease-in-out z-[1]
  before:content-['Login'] before:absolute before:top-0 before:left-0 before:w-full before:h-full 
  before:bg-gradient-to-r before:from-[rgb(20,131,228)] before:to-[rgb(152,239,250)] before:opacity-0 
  before:transition-opacity before:duration-500 hover:before:opacity-100 before:rounded-md mb-0"
              >
                Login
              </Button>
            </form>
          </Form>
          <div className="flex justify-between  w-full max-w-md px-4 !mt-2">
            <span className="hover:underline cursor-pointer text-sm text-[hsl(222.2_84%_4.9%)]">
              Forgot password?
            </span>
            <span className="hover:underline cursor-pointer text-sm text-[hsl(222.2_84%_4.9%)]">
              Don't have an account?
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
