"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import Link from "next/link";
import { loginSchema } from "@/app/types/Api/request";
import { Loader } from "lucide-react";
export default function Login() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof loginSchema>) {}
  return (
    // <div className=" relative w-full lg:w-[60svw] flex flex-col ">
    //   <div className="absolute inset-0 bg-black/20 backdrop-blur-lg"></div>
    //   <div className="z-10 flex flex-col justify-center items-center space-y-8 mx-auto  flex-1 w-full p-4">
    //     <div className="w-full flex flex-col justify-center items-center ">
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full max-w-md px-4 mb-0"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  {...field}
                  className="border-white"
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  {...field}
                  className="border-white"
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          variant="styled"
          type="submit"
          className="relative w-full  before:flex before:items-center before:justify-center text-white 
  bg-gradient-to-r from-[#5d1cad] to-[#C46FE7] transition-all duration-300 ease-in-out z-[1]
  before:content-['Login'] before:absolute before:top-0 before:left-0 before:w-full before:h-full 
  before:bg-gradient-to-r before:from-[#C46FE7] before:to-[#5d1cad] before:opacity-0 
  before:transition-opacity before:duration-500 hover:before:opacity-100 before:rounded-md mb-0"
        >
          <Loader />
          Login
        </Button>
      </form>
    </Form>
    // <div className="flex justify-between  w-full max-w-md px-4 !mt-2">
    //   <span className="hover:underline custom-pointer text-sm t">
    //     Forgot password?
    //   </span>
    //   <Link href={"/auth/signup"}>
    //     <span className="hover:underline custom-pointer text-sm ">
    //       Don't have an account?
    //     </span>
    //   </Link>
    // </div>
    //     </div>
    //   </div>
    // </div>
  );
}
