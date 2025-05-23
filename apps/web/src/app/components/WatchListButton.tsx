"use client";
import { cn } from "@/lib/utils";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { TWatchListOptions } from "@/app/types";
import { ChevronDown } from "lucide-react";

type Checked = DropdownMenuCheckboxItemProps["checked"];
interface WatchListButtonProps {
  id: number;
  isInWatchList?: boolean;
  value?: TWatchListOptions;
  className?: string;
}

export default function WatchListButton({
  id,
  isInWatchList,
  value,
  className,
}: WatchListButtonProps) {
  const [localValue, setLocalValue] = useState<TWatchListOptions | undefined>(
    value
  );
  useEffect(() => {
    setLocalValue(value);
  }, [value]);
  const options: { label: string; key: TWatchListOptions }[] = [
    { label: "Watching", key: "watching" },
    { label: "Completed", key: "completed" },
    { label: "On-Hold", key: "onHold" },
    { label: "Dropped", key: "dropped" },
    { label: "Plan to Watch", key: "planToWatch" },
    { label: "Remove", key: "remove" },
  ];
  const handleOptionChange: (option: TWatchListOptions) => void = (option) => {
    setLocalValue(option);
  };

  return (
    <>
      {!isInWatchList || localValue === "remove" ? (
        <Button className={cn(className)}>Add to Watchlist</Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className={cn(className, "flex justify-between items-center")}
            >
              {options.find((option) => option.key === localValue)?.label}
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {options.map((option) => (
              <DropdownMenuCheckboxItem
                key={option.key}
                className="cursor-pointer"
                checked={localValue === option.key}
                onCheckedChange={() => handleOptionChange(option.key)}
              >
                {option.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
