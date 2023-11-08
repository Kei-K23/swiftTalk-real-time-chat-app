"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

interface UserAvatarProp {
  name: string;
  email: string;
  image: string;
}

export function UserAvatar({ email, image, name }: UserAvatarProp) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={image === "img" ? "/userProfile.png" : image}
              alt={name}
            />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-lg font-medium leading-none mb-2">{name}</p>
            <p className="text-md leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0">
          <Button
            onClick={() => signOut()}
            variant={"destructive"}
            className="w-full h-full"
          >
            Logout <LogOutIcon className="ml-4 h-5" />
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
