import { authOptions } from "@/lib/utils/authOptions";
import { getServerSession } from "next-auth";

import Button from "../_components/Button";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  return (
    <>
      <div>{session.user?.name}</div>
      <Button />
    </>
  );
};

export default Dashboard;
