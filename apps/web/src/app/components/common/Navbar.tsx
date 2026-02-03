import { useNavigate } from "@tanstack/react-router";
import { Menu, } from "lucide-react";
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
function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  return (
    <div className="h-16 bg-muted flex items-center px-4 shadow-sm fixed top-0 w-full z-100">
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

      <div className="ml-auto">
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
            <PopoverContent>
              <ol>
                <li>Profile</li>
                <li>Settings</li>
                <li>Logout</li>
              </ol>
            </PopoverContent>
          </Popover>
        ) : (
          <Auth />
        )}
      </div>
    </div>
  );
}

export default Navbar;
