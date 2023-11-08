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

type RoomType = {
  name?: string;
  id?: number;
  ownerId?: string | null;
};

interface HeroProp {
  users: UserType[];
  rooms: RoomType[];
  currentUserId: string;
  currentUserName?: string | null;
}

const Hero = ({ rooms, users, currentUserId, currentUserName }: HeroProp) => {
  const socket = io("http://localhost:8090");

  socket.on("connection", () => {
    console.log(socket.connected); // true
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from the server");
  });

  const [selectedRoom, setSelectedRoom] = useState(1);

  socket.emit("enterRoom", {
    name: currentUserName,
    room: "Global",
  });

  function selectRoom(roomId: number) {
    setSelectedRoom((prev) => (prev = roomId));
  }

  return (
    <div className="flex justify-between items-center h-[92%]">
      <Sidebar
        selectRoom={selectRoom}
        roomLists={rooms}
        roomId={selectedRoom}
        className="w-[30%] md:w-[24%] lg:w-[17%]  xl:w-[14%] border-l-[1px] dark:border-r-neutral-700 border-r-neutral-300 h-full"
      />
      <ChatPalyGround
        socket={socket}
        roomId={selectedRoom}
        currentUserId={currentUserId}
        currentUserName={currentUserName}
      />
      <Sidebar
        currentUserId={currentUserId}
        className="w-[30%] md:w-[24%] lg:w-[17%] xl:w-[14%] border-r-[1px] dark:border-l-neutral-700 border-l-neutral-300 h-full"
        friendLists={users}
      />
    </div>
  );
};

export default Hero;
