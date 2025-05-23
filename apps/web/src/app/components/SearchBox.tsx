"use client";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
interface SearchBoxProps {
  renderIcon?: boolean;
  placeholder?: string;
  className?: string;
}
export default function SearchBox({
  renderIcon = false,
  placeholder = "Search anime",
  className,
}: SearchBoxProps) {
  const [showInputField, setShowInputField] = useState(false);
  return (
    <React.Fragment>
      {renderIcon ? (
        <Button
          size="icon"
          variant="icon"
          className="md:hidden shadow-none border-none "
          onClick={() => setShowInputField(!showInputField)}
        >
          <Search className="!w-6 !h-6" />
        </Button>
      ) : (
        <Input
          placeholder={placeholder}
          className={cn(
            className,
            "w-full max-w-md bg-white border-none rounded-none shadow-sm text-slate-950 outline-none hidden md:block shrink"
          )}
        />
      )}
      {showInputField && (
        <div className="fixed top-14 left-0 w-full bg-slate-900/50 z-50 flex items-center justify-center px-4 md:hidden">
          <Input
            placeholder={placeholder}
            className={cn(
              className,
              "w-full bg-white border-none rounded-none shadow-sm text-slate-950 outline-none"
            )}
          />
        </div>
      )}
    </React.Fragment>
  );
}
