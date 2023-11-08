"use client";
import { Badge } from "@/components/ui/badge";
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

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  currentUserId?: string;
  friendLists?: UserType[];
  socket: Socket;
  isSocketConnected: boolean;
}

export function Sidebar({
  className,
  socket,
  isSocketConnected,
}: SidebarProps) {
  const [activeUserList, setActiveUserList] = useState<string[]>([]);

  function randomEmoji(): string {
    const emojis = [
      "🍇",
      "🍈",
      "🍉",
      "🍊",
      "🍋",
      "🍌",
      "🍍",
      "🥭",
      "🍎",
      "🍏",
      "🍐",
      "🍑",
      "🍒",
      "🍓",
      "🫐",
      "🥝",
      "🍅",
      "🫒",
      "🥥",
      "🥕",
      "🌽",
      "🌶️",
      "🫑",
      "🥒",
      "🥬",
      "🥦",
      "🧄",
      "🧅",
      "🥜",
      "🫘",
      "🌰",
      "🫚",
      "🫛",
    ];
    return emojis[Math.floor(Math.random() * emojis.length)];
  }

  socket.on("userLists", (data) => {
    setActiveUserList(data.users);
  });

  return (
    <div className={cn(className)}>
      {/* Friend lists for right side bar */}

      <div className="space-y-4 py-4">
        <div className="flex justify-center items-center">
          <Badge
            className="mx-auto text-md"
            variant={`${isSocketConnected ? "default" : "destructive"}`}
          >
            {isSocketConnected
              ? "Live communication"
              : "Hold on! I'm connecting"}
          </Badge>
        </div>
        {activeUserList && (
          <div className="py-2">
            <h2 className="relative px-7 text-lg font-semibold tracking-tight">
              Active People
            </h2>
            <ScrollArea className="h-[500px] px-1">
              <div className="p-2">
                {activeUserList &&
                  activeUserList?.map((user) => {
                    if (user !== "admin") {
                      const emoji = randomEmoji();
                      return (
                        <div
                          className={`dark:bg-neutral-800 bg-neutral-200 my-3  p-2 rounded-xl`}
                          key={user}
                        >
                          <h3 className={`text-lg text-center `}>
                            {emoji} {user}
                          </h3>
                        </div>
                      );
                    }
                  })}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
}

// bg-neutral-100 dark:bg-neutral-800
