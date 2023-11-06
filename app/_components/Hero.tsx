import React from "react";
import LoginDialog from "./LoginDialog";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils/authOptions";
import { buttonVariants } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";
const Hero = async () => {
  const session = await getServerSession(authOptions);

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
        {session && session.user ? (
          <Link
            className={buttonVariants({ variant: "default", size: "lg" })}
            href={"/dashboard"}
          >
            Welcome back {session.user.name}{" "}
            <LogInIcon className="ml-2 h-6 w-6" />
          </Link>
        ) : (
          <LoginDialog />
        )}
      </div>
    </>
  );
};

export default Hero;
