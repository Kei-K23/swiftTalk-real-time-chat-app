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
import Image from "next/image";
import Separator from "./Separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

const registerForm = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "password must be at least 6 character",
  }),
});

export default function LoginDialog() {
  const form = useForm<z.infer<typeof registerForm>>({
    resolver: zodResolver(registerForm),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(value: z.infer<typeof registerForm>) {
    signIn("credentials", {
      callbackUrl: "/dashboard",
      email: value.email,
      password: value.password,
    });
  }

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
          <DialogTitle className="text-xl">Login To SwiftTalk</DialogTitle>
          <DialogDescription className="text-md">
            Login in to our with your desire methods
          </DialogDescription>
          <DialogDescription>
            <Link className="text-blue-400 underline" href={"/register"}>
              New user? register here
            </Link>
          </DialogDescription>
        </DialogHeader>

        <Button onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
          <Image
            src={"/google.png"}
            alt="google icon"
            width={30}
            height={30}
            className="mr-3"
          />{" "}
          Login with Google
        </Button>

        <Separator />

        <Button onClick={() => signIn("github", { callbackUrl: "/dashboard" })}>
          <Image
            src={"/github.png"}
            alt="github icon"
            width={30}
            height={30}
            className="mr-3"
          />{" "}
          Login with Github
        </Button>

        <Separator />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g foo@example.com"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormDescription>This is your email.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g password123" {...field} required />
                  </FormControl>
                  <FormDescription>This is your password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Register </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
