"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Socket } from "socket.io-client";

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

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  currentUserId?: string;
  friendLists?: UserType[];
  socket: Socket;
}

export function Sidebar({ className, currentUserId, socket }: SidebarProps) {
  const [activeUserList, setActiveUserList] = useState<string[]>([]);

  socket.on("userLists", (data) => {
    console.log("uselist", data.users);
    setActiveUserList(data.users);
  });

  return (
    <div className={cn(className)}>
      {/* Friend lists for right side bar */}
      <div className="space-y-4 py-4">
        {activeUserList && (
          <div className="py-2">
            <h2 className="relative px-7 text-lg font-semibold tracking-tight">
              Active People
            </h2>
            <ScrollArea className="h-[500px] px-1">
              <div className="p-2">
                {activeUserList &&
                  activeUserList?.map((user) => {
                    if (user !== "admin")
                      return (
                        <div
                          className="my-3 bg-neutral-100 dark:bg-neutral-800 py-4 px-2 rounded-xl"
                          key={user}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg ">{user}</h3>
                          </div>
                        </div>
                      );
                  })}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
}
