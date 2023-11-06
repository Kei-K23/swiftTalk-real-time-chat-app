"use client";

import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

const Button = () => {
  return (
    <button onClick={() => signOut()}>
      <span className="text-lg">logtout</span>
      <LogOutIcon className="ml-2 h-6 w-6" />
    </button>
  );
};

export default Button;
