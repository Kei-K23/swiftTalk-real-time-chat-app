import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "This is register page for new user",
};

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};

export default RegisterLayout;
