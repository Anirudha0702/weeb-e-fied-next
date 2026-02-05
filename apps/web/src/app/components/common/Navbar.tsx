import { useNavigate } from "@tanstack/react-router";
import { CircleUserRound, Frown, LoaderCircle, LogOut, Menu, Settings } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import Sidebar from "./Sidebar";
import Search from "./SearchField";
import useAuthStore from "@/app/store/authStore";
import Auth from "./Auth";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { useApiMutation } from "@/app/hooks/useApi";
import { logoutResponseSchema, type LogoutResponse } from "@/app/types/api";
import { useState } from "react";
import {
  DialogContent,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function Navbar() {
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();
  const [openLogoutPopup, setOpenLogoutPopup] = useState(false);
  const mutation = useApiMutation<LogoutResponse>({
    endpoint: "/auth/logout",
    method: "POST",
    responseSchema: logoutResponseSchema,
  },{
    onSuccess:()=>{
      clearAuth()
      setOpenLogoutPopup(false)
    },
    onError:()=>{
      setOpenLogoutPopup(false)
    }
  });
  const logout = () => {
    setOpenLogoutPopup(true);
  };
  const confirmLogout=(e:React.MouseEvent<HTMLButtonElement>)=>{
     const val=e.currentTarget.dataset.confirm
     if(val==='yes')mutation.mutate(undefined)
      else setOpenLogoutPopup(false)
  }

  return (
    <div className="h-16 bg-muted flex items-center px-4 shadow-sm fixed top-0 w-full z-50">
      <Drawer direction="left">
        <DrawerTrigger asChild>
          <Menu className="lg:hidden shrink-0 mt-1 mr-3" />
        </DrawerTrigger>
        <DrawerContent className="lg:hidden max-w-none h-[100svh-4rem] mt-16 w-80!">
          <Sidebar className="h-full" />
        </DrawerContent>
      </Drawer>

      <img
        src="/images/logo-text-crop.png"
        alt=""
        className="h-12 cursor-pointer"
        onClick={() =>
          navigate({
            to: "/",
          })
        }
      />
      <Search />

      <div className="ml-auto z-999">
        {user ? (
          <Popover>
            <PopoverTrigger>
              {" "}
              <Avatar>
                <AvatarImage
                  src={user.profilePicture || "https://github.com/shadcn.png"}
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
                <AvatarBadge className="bg-green-600 dark:bg-green-800" />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="mr-4">
              <p className="text-primary text-ellipsis font-bold">
                {user.name}
              </p>
              <p className="text-xs text-ellipsis text-white/60">
                {user.email}
              </p>
              <ol className="my-2 space-y-2">
                <li className="flex items-center bg-muted p-2 rounded-sm py-1 cursor-pointer hover:text-chart-4">
                  <CircleUserRound className="mr-2" size={16} />
                  Profile
                </li>
                <li className="flex items-center bg-muted p-2 rounded-sm py-1 cursor-pointer hover:text-chart-4">
                  <Settings className="mr-2" size={16} />
                  Settings
                </li>
              </ol>
              <p className="flex justify-end hover:text-chart-4 cursor-pointer">
                <p className=" items-center flex" onClick={logout}>
                  Logout <LogOut className="ml-2" size={16} />
                </p>
              </p>
            </PopoverContent>
          </Popover>
        ) : (
          <Auth />
        )}
      </div>

      <Dialog open={openLogoutPopup}>
        <DialogContent className="sm:max-w-sm" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="flex gap-2 items-center">Logout <Frown /></DialogTitle>
            <DialogDescription>
              Are you sure, you want to logout?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
              {
                mutation.isPending?(<Button className="cursor-pointer" >
              <LoaderCircle className="animate-spin"/>
            </Button>):(<><Button
                variant="outline"
                className="cursor-pointer"
                data-confirm="no" onClick={confirmLogout}
              >
                No
              </Button>
            <Button className="cursor-pointer" data-confirm="yes" onClick={confirmLogout}>
              Yes
            </Button></>)
              }
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Navbar;
