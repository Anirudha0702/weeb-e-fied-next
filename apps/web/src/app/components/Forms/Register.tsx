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
import { signupSchema } from "@/app/types/Api/request";
import { useState } from "react";
import { registerUser } from "@/actions/registerUser";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";
interface RegisterProps {
  onSuccess?: () => void;
}
export default function Register({ onSuccess }: RegisterProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      fullname: "",
    },
  });
  async function onSubmit(values: z.infer<typeof signupSchema>) {
    try {
      setLoading(true);
      const res = await registerUser({
        name: values.fullname,
        email: values.email,
        password: values.password,
      });
      toast({
        title: "Registration successful!",
        description: "You have successfully registered.",
        className: "bg-green-500 text-white",
      });
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          error && typeof error === "object" && "message" in error
            ? (error as { message?: string }).message
            : "An error occurred while registering. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full max-w-md px-4 mb-0"
        >
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Enter your name"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
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
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
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
            className="w-full bg-blue-500 border-0 flex items-center gap-2"
          >
            {loading && <Loader className="animate-spin" />}
            Signup
          </Button>
        </form>
      </Form>
    </div>
  );
}
