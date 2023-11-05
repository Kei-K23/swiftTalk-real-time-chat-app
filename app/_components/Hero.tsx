import { Button } from "@/components/ui/button";
import { LogInIcon, User } from "lucide-react";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <>
      <h1 className="mt-10 md:mt-0 text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center tracking-wider">
        Connect and Chat with the <span className="text-sky-600">World</span>
      </h1>
      <h2 className="underline mt-2 mb-4 text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-center tracking-wider">
        Experience seamless communication with our chat app
      </h2>
      <p className="mb-6 text-xl lg:text-2xl xl:text-3xl max-w-7xl mx-auto text-center leading-relaxed">
        Welcome to <span className="text-sky-600 font-bold">SwiftTalk</span>,
        where real-time communication becomes effortless, and better experiences
        and connecting with friends.
      </p>

      <div className="flex justify-center items-center flex-col">
        <Button>
          <span className="text-lg">Login To SwiftTalk</span>
          <LogInIcon className="ml-2 h-6 w-6" />
        </Button>

        <div className="w-full h-[1px] dark:bg-slate-400  bg-black my-4"></div>

        <Button>
          <Link href={"/register"} className="text-lg">
            Dont&apos;t have an account! Register first
          </Link>
          <User className="ml-2 h-6 w-6" />
        </Button>
      </div>
    </>
  );
};

export default Hero;
