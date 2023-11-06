import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "This is register page for new user",
};

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
};

export default RegisterLayout;
