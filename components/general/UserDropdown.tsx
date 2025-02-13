import { ChevronDown, Heart, Layers2, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { signOut } from "@/app/utils/auth";

interface iAppProps {
  email: string;
  name: string;
  image: string;
}

export function UserDropdown({ email, name, image }: iAppProps) {
  console.log(image);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto p-0 hover:bg-transparent text-primary font-bold tracking-wider"
        >
          <Avatar>
            <AvatarImage src={image} alt="Profile Image" />
            <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <ChevronDown size={16} strokeWidth={2} className="ml-2 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuLabel className="flex flex-col">
          <span className="text-sm font-medium text-foreground tracking-wider">
            {name}
          </span>
          <span className="text-xs text-muted-foreground">{email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/favorites">
              <Heart
                size={16}
                strokeWidth={2}
                className="opacity-50 hover:opacity-100 text-primary"
                // fill="#fff"
              />
              <span className="">Favorite Jobs</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/my-jobs">
              <Layers2
                size={16}
                strokeWidth={2}
                className="opacity-50 hover:opacity-100 text-primary"
                // fill="#fff"
              />
              <span className="">My Job Listing</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <form
            action={async () => {
              "use server";

              await signOut({ redirectTo: "/" });
            }}
          >
            <button className="flex w-full items-center gap-2">
              <LogOut
                size={16}
                strokeWidth={2}
                className="opacity-50 hover:opacity-100 text-primary"
              />
              <span className="">Logout</span>
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
