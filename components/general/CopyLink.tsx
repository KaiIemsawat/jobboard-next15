"use client";

import { Link2 } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { toast } from "sonner";

interface CopyLinkMenuItemProps {
  jobUrl: string;
}

export function CopyLinkMenuItem({ jobUrl }: CopyLinkMenuItemProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jobUrl);
      toast.success("URL copied to clipboard");
    } catch (err) {
      console.error("Could not copy text: ", err);
      toast.error("Failed to copy URL");
    }
  };
  return (
    <DropdownMenuItem
      onSelect={handleCopy}
      className="text-muted-foreground hover:text-white text-xs cursor-pointer"
    >
      <Link2 className="size-4" />
      <span className="">Copy Job URL</span>
    </DropdownMenuItem>
  );
}
