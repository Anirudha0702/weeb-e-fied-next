"use client";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Links } from "../utils/aliases";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SearchBox from "@/app/components/SearchBox";
import { useRouter } from "next/navigation";
import AuthPopUp from "@/app/components/Popups/AuthPopup";

const Header = () => {
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const router = useRouter();
  return (
    <div
      className={cn(
        `h-14 w-full   flex items-center relative md:fixed  top-0 z-[100]  bg-slate-900/20 ${
          scroll
            ? "from-slate-950 to-slate-900"
            : "transparent backdrop-blur-sm "
        } p-2 px-4`
      )}
    >
      <Sheet>
        <SheetTrigger>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader className="mt-2">
            <SheetTitle>
              <Button variant="link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                  />
                </svg>{" "}
                <span>Community</span>
              </Button>
            </SheetTitle>
            <SheetDescription>
              {Links.map((link) => (
                <Link
                  href={link.url}
                  key={link.url}
                  className=" h-12 border-b border-white/70 flex items-center hover:text-red-500 text-white"
                >
                  {link.name}
                </Link>
              ))}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <div className="flex items-center  grow gap-2">
        <span className="font-logoFont text-4xl ml-4  mr-2 shrink-0">
          Weeb E fied
        </span>

        <SearchBox />
        <div className=" ml-auto flex items-center gap-2">
          <SearchBox renderIcon />

          <span className="hidden sm:block">
            <AuthPopUp formtype="login" />
            <AuthPopUp formtype="register" />
          </span>
          {/* <Button
            variant="icon"
            size="icon"
            className="hidden sm:inline-flex"
            onClick={() => router.push("/anime/community")}
          {/* <Button variant="icon" size="icon" className="hidden sm:inline-flex">
            <Link href={"/anime/community"}>
              <MessageCircleMore className="!w-6 !h-6" />
            </Link>
          </Button>

          <Button variant="icon" size="icon" className="hidden sm:inline-flex">
            <Link href={"/notifications"}>
              <Bell className="!w-6 !h-6" />
            </Link>
          </Button>
          <Profile /> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
