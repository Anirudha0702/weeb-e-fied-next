import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "lucide-react";
import Login from "./forms/Login";
import { useState } from "react";
import SignUp from "./forms/SignUp";
function Auth() {
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(true);
  const changeForm = (e: React.MouseEvent<HTMLSpanElement>) => {
    const form = e.currentTarget.dataset.form;
    setIsLoginFormOpen(form === "login");
  };
  return (
    <Dialog>
      <DialogTrigger>
        <User />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-left mb-4">
            <div className="relative inline-flex gap-6">
              {/* animated underline */}
              <span
                className={`absolute -bottom-3 h-0.5 w-13 bg-primary transition-all duration-300 ease-in-out
      ${isLoginFormOpen ? "left-0" : "left-15"}`}
              />

              <span
                data-form="login"
                onClick={changeForm}
                className={`cursor-pointer transition-all duration-300 ease-in-out ${
                  isLoginFormOpen
                    ? "text-xl text-foreground"
                    : "text-sm text-muted-foreground"
                }`}
              >
                Login
              </span>

              <span
                data-form="signup"
                onClick={changeForm}
                className={`cursor-pointer transition-all duration-300 ease-in-out ${
                  !isLoginFormOpen
                    ? "text-xl text-foreground"
                    : "text-sm text-muted-foreground"
                }`}
              >
                Sign up
              </span>
            </div>
          </DialogTitle>
          <DialogDescription>
            {isLoginFormOpen?<Login />:<SignUp/>}

          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default Auth;
