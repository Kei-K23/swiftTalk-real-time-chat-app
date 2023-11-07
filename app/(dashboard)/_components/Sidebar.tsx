"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { UserCircle } from "lucide-react";

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
  roomLists?: RoomType[];
  selectRoom?: (roomId: number) => void;
  roomId?: number;
}

export function Sidebar({
  className,
  friendLists,
  currentUserId,
  roomLists,
  roomId,
  selectRoom,
}: SidebarProps) {
  return (
    <div className={cn(className)}>
      {/* Friend lists for right side bar */}
      <div className="space-y-4 py-4">
        {friendLists && (
          <div className="py-2">
            <h2 className="relative px-7 text-lg font-semibold tracking-tight">
              People
            </h2>
            <ScrollArea className="h-[500px] px-1">
              <div className="p-2">
                {friendLists &&
                  friendLists?.map((friendList) => {
                    if (friendList.id !== currentUserId) {
                      if (friendList.name !== "admin")
                        return (
                          <div
                            className="my-3 bg-neutral-100 dark:bg-neutral-800 py-4 px-2 rounded-xl"
                            key={friendList.id}
                          >
                            <div
                              className="flex items-center gap-2 mb-2"
                              title={`add friend to ${friendList.name}`}
                            >
                              <Avatar className="h-12 w-12">
                                <AvatarImage
                                  src={friendList.image ?? "/user"}
                                  alt={friendList.name ?? "profile"}
                                />
                                <AvatarFallback>
                                  {friendList.name}
                                </AvatarFallback>
                              </Avatar>
                              <h3 className="text-lg ">{friendList.name}</h3>
                            </div>
                            <Button
                              size={"lg"}
                              variant="default"
                              className="w-full text-md text-center font-normal"
                              aria-label={`add friend to ${friendList.name}`}
                              title={`add friend to ${friendList.name}`}
                            >
                              <UserCircle className="mr-3" /> Add friends
                            </Button>
                          </div>
                        );
                    }
                  })}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* room lists for left side bar */}
        {roomLists && (
          <div className="py-2">
            <h2 className="relative px-7 text-lg font-semibold tracking-tight">
              Chat rooms
            </h2>
            <ScrollArea className="h-[500px] px-1">
              <div className="p-2">
                {roomLists &&
                  roomLists.map((room) => {
                    return (
                      <div
                        onClick={() => {
                          if (selectRoom) selectRoom(room.id as number);
                        }}
                        className={`${
                          roomId === room.id && "ring-1 ring-neutral-400"
                        } my-3 bg-neutral-100 dark:bg-neutral-800 p-2 px-4 rounded-xl`}
                        key={room.id}
                      >
                        <div
                          className="flex items-center gap-2 mb-2"
                          title={`${room.name}'s chat room`}
                        >
                          {room.name === "Global" && (
                            <Avatar className="h-11 w-11">
                              <AvatarImage src={"/globe.png"} alt={room.name} />
                              <AvatarFallback>{room.name}</AvatarFallback>
                            </Avatar>
                          )}

                          <h3 className="text-lg ml-3">{room.name}</h3>
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
