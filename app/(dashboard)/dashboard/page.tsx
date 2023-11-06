import { authOptions } from "@/lib/utils/authOptions";
import { getServerSession } from "next-auth";

import Button from "../_components/Button";
import { redirect } from "next/navigation";
import { Sidebar } from "../_components/Sidebar";
import ChatPalyGround from "../_components/ChatPalyground";
import Navbar from "../_components/Navbar";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  return (
    <>
      <Navbar />

      <div className="flex justify-between items-center">
        <Sidebar className="w-[30%] md:w-[24%] lg:w-[17%] xl:w-[14%] border-r-[1px] dark:border-r-neutral-700 border-r-neutral-300" />
        <ChatPalyGround />
        <Sidebar className="w-[30%] md:w-[24%] lg:w-[17%]  xl:w-[14%] border-l-[1px] dark:border-r-neutral-700 border-r-neutral-300" />
      </div>
    </>
  );
};

export default Dashboard;
