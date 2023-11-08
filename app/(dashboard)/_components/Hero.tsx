"use client";

import { io } from "socket.io-client";
import ChatPalyGround from "./ChatPalyground";
import { Sidebar } from "./Sidebar";
import { useState } from "react";

type UserType = {
  name?: string | null;
  image?: string | null;
  id?: string | null;
  email?: string | null;
};

interface HeroProp {
  users: UserType[];
  currentUserId: string;
  currentUserName?: string | null;
}

const Hero = ({ users, currentUserId, currentUserName }: HeroProp) => {
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  const socket = io("http://localhost:8090");

  socket.on("connect", () => {
    setIsSocketConnected(true);
  });

  socket.on("disconnect", () => {
    setIsSocketConnected(false);

    console.log("Disconnected from the server");
  });

  socket.emit("enterRoom", {
    name: currentUserName,
    room: "Global",
  });

  return (
    <div className="flex justify-between items-center h-[92%]">
      <ChatPalyGround
        socket={socket}
        currentUserId={currentUserId}
        currentUserName={currentUserName}
      />
      <Sidebar
        socket={socket}
        currentUserId={currentUserId}
        className="w-[30%] md:w-[24%] lg:w-[17%] xl:w-[14%] border-r-[1px] dark:border-l-neutral-700 border-l-neutral-300 h-full"
        friendLists={users}
        isSocketConnected={isSocketConnected}
      />
    </div>
  );
};

export default Hero;
