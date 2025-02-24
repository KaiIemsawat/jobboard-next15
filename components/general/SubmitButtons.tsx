"use client";

import { cn } from "@/lib/utils";
import { Bookmark, Loader2 } from "lucide-react";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

interface GeneralSubmitButtonsProps {
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  width?: string;
  icon?: ReactNode;
}

export function GeneralSubmitButtons({
  text,
  variant,
  width,
  icon,
}: GeneralSubmitButtonsProps) {
  const { pending } = useFormStatus();

  return (
    <Button variant={variant} className={width} disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin ">
            <span className="">Submitting...</span>
          </Loader2>
        </>
      ) : (
        <div className="flex items-center gap-2">
          {icon && <div className="">{icon}</div>}
          <span className="">{text}</span>
        </div>
      )}
    </Button>
  );
}

export function SaveJobButton({ savedJob }: { savedJob: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button variant="outline" type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          <span className="">Saving...</span>
        </>
      ) : (
        <>
          <Bookmark
            className={cn(
              savedJob ? "fill-current text-green-600" : "text-primary",
              "size-4 transition-colors",
            )}
          />
          {savedJob ? (
            <>
              <p className="text-primary font-bold">SAVED</p>
            </>
          ) : (
            <>
              <p className="text-primary">Save Job</p>
            </>
          )}
        </>
      )}
    </Button>
  );
}
