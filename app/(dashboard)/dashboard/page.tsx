import { authOptions } from "@/lib/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Sidebar } from "../_components/Sidebar";
import ChatPalyGround from "../_components/ChatPalyground";
import Navbar from "../_components/Navbar";
import { getAllUser } from "@/services/user.service";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  const users = (await getAllUser()) || [];

  if (!session) {
    return redirect("/");
  }

  return (
    <>
      <Navbar
        email={session.user?.email as string}
        name={session.user?.name as string}
        image={session.user?.image as string}
      />

      <div className="flex justify-between items-center h-auto">
        <Sidebar
          currentUserId={session.user.id}
          className="w-[30%] md:w-[24%] lg:w-[17%]  xl:w-[14%] border-l-[1px] dark:border-r-neutral-700 border-r-neutral-300"
        />
        <ChatPalyGround />
        <Sidebar
          currentUserId={session.user.id}
          className="w-[30%] md:w-[24%] lg:w-[17%] xl:w-[14%] border-r-[1px] dark:border-r-neutral-700 border-r-neutral-300"
          friendLists={users}
        />
      </div>
    </>
  );
};

export default Dashboard;
