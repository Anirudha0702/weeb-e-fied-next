"use client";
import ForgetPassword from "@/app/components/Forms/ForgetPassword";
import Login from "@/app/components/Forms/Login";
import Register from "@/app/components/Forms/Register";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
interface AuthPopUpProps {
  formtype: "login" | "register" | "forgot";
}

export default function AuthPopUp({ formtype }: AuthPopUpProps) {
  const [formType, setFormType] = useState(formtype);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setFormType(formtype);
  }, [formtype]);
  const getTitle = () =>
    formType === "login"
      ? "Login"
      : formType === "register"
      ? "Sign Up"
      : "Forgot your password?";
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          size={"custom"}
          variant={"styled"}
          className="bg-white hover:bg-transparent hover:border-white text-black hover:text-white border-2 border-white"
        >
          {getTitle()}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-5xl">{getTitle()}</DialogTitle>
        </DialogHeader>
        {formType === "login" ? (
          <Login />
        ) : formType === "register" ? (
          <Register onSuccess={() => setOpen(false)} />
        ) : (
          <ForgetPassword />
        )}
      </DialogContent>
    </Dialog>
  );
}
