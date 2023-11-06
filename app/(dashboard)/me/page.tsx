import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/utils/authOptions";
import { LogOutIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  return (
    <div>
      {session.user?.name}
      {/* 
      <Button onClick={() => signOut()}>
        <span className="text-lg">Login To SwiftTalk</span>
        <LogOutIcon className="ml-2 h-6 w-6" />
      </Button> */}
    </div>
  );
};

export default Dashboard;
