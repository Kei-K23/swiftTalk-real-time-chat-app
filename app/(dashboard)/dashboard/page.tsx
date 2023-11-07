import { authOptions } from "@/lib/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Navbar from "../_components/Navbar";
import { getAllUser } from "@/services/user.service";
import { getAllRooms } from "@/services/rooms.service";
import Hero from "../_components/Hero";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  const users = (await getAllUser()) || [];
  const rooms = (await getAllRooms()) || [];
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
      <Hero currentUserId={session.user.id} rooms={rooms} users={users} />
    </>
  );
};

export default Dashboard;
