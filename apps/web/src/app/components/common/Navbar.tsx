import { useNavigate } from "@tanstack/react-router";
import { Menu, User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import Sidebar from "./Sidebar";
import Search from "./SearchField";
function Navbar() {
  const navigate = useNavigate();

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
        <Popover>
          <PopoverTrigger>
            {" "}
            <User />
          </PopoverTrigger>
          <PopoverContent>
            <ol>
              <li>Profile</li>
              <li>Settings</li>
              <li>Logout</li>
            </ol>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default Navbar;
