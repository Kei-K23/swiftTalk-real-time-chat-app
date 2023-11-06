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

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  currentUserId: string;
  friendLists?: UserType[];
}

export function Sidebar({
  className,
  friendLists,
  currentUserId,
}: SidebarProps) {
  return (
    <div className={cn(className)}>
      <div className="space-y-4 py-4">
        <div className="py-2">
          <h2 className="relative px-7 text-lg font-semibold tracking-tight">
            Friends
          </h2>
          <ScrollArea className="h-[500px] px-1">
            <div className="space-y-1 p-2">
              {friendLists?.map((friendList) => {
                if (friendList.id !== currentUserId) {
                  return (
                    <div
                      className="my-3 bg-neutral-100 py-4 px-2 rounded-xl"
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
                          <AvatarFallback>{friendList.name}</AvatarFallback>
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
      </div>
    </div>
  );
}
