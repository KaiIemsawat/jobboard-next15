"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

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
    <Button variant={variant} className={width}>
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
