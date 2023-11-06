import { authOptions } from "@/lib/utils/authOptions";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "This is home page of user",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  return <main className="h-screen">{children}</main>;
}
