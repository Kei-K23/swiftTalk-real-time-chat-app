"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { LogInIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <span className="text-lg">Login To SwiftTalk</span>
          <LogInIcon className="ml-2 h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login To SwiftTalk</DialogTitle>
          <DialogDescription>
            You can login to our app using different login providers. If you
            dont have an account! Create account first or you can simply use
            third-party providers.
          </DialogDescription>
          <DialogDescription>
            <Link className="text-blue-400 underline" href={"/register"}>
              register link
            </Link>
          </DialogDescription>
        </DialogHeader>

        <Button onClick={() => signIn("google", { callbackUrl: "/me" })}>
          Login with Google
        </Button>

        <div className="flex justify-center items-center">
          <div className="flex-[1] h-[1px] bg-slate-400 "></div>

          <div className="mx-4">Or</div>

          <div className="flex-[1] h-[1px] bg-slate-400 "></div>
        </div>

        <Button onClick={() => signIn("github", { callbackUrl: "/me" })}>
          Login with Github
        </Button>
      </DialogContent>
    </Dialog>
  );
}
