"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useEffect, useState } from "react";
import InputForm from "./InputForm";

interface ChatPalyGroundProp {
  roomId: number;
}

interface Message {
  messageId: number;
  message: string;
  userId: string;
  userImg: string;
  userEmail: string;
  userName: string;
}

const ChatPalyGround = ({ roomId }: ChatPalyGroundProp) => {
  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: roomId }),
        });
        if (res.ok) {
          const { data } = await res.json();
          if (Array.isArray(data)) {
            console.log(data);
            setMessages(data);
          } else {
            setMessages([]);
            console.error("Received invalid data for messages");
          }
        } else {
          setMessages([]);
          console.error("Error fetching messages:", res.status, res.statusText);
        }
      } catch (error) {
        setMessages([]);
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [roomId]);

  return (
    <div className="flex-1 bg-neutral-100 dark:bg-neutral-800 h-full w-full">
      <ScrollArea className="h-[90%] px-1">
        {messages && messages.length > 0 ? (
          <div className="px-5 py-3">
            {messages.map((message) => (
              <div
                className="flex justify-start items-center gap-4 my-5"
                key={message.messageId}
              >
                <Avatar className="h-11 w-11">
                  <AvatarImage
                    src={`${
                      message.userImg
                        ? message.userId ===
                          "13f87cc8-4370-43d3-9020-6d7be7e380b3"
                          ? "/admin_icon_dark.png"
                          : message.userImg
                        : "/user.png"
                    }`}
                    alt={`${message.userName}'s avatar`}
                  />
                  <AvatarFallback>{message.userName}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-4">
                    <h3>{message.userName}</h3>
                    {message.userId ===
                      "13f87cc8-4370-43d3-9020-6d7be7e380b3" && (
                      <span className="text-red-600">(Admin)</span>
                    )}
                  </div>
                  <p>{message.message}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h2>no messages to show</h2>
        )}
      </ScrollArea>
      <InputForm />
    </div>
  );
};

export default ChatPalyGround;
