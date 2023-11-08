"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useEffect, useState, useRef } from "react";
import InputForm from "./InputForm";
import { Socket } from "socket.io-client";
import LottieProvider from "@/components/provider/LottieProvider";
import { lottieJSON } from "@/public/lottieJSON";
interface ChatPalyGroundProp {
  socket: Socket;
  currentUserName?: string | null;
  currentUserId: string;
}

interface Message {
  messageId: number;
  message: string;
  userId: string;
  userImg: string;
  userEmail: string;
  userName: string;
  createdAt: Date;
}

const ChatPalyGround = ({
  socket,
  currentUserName,
  currentUserId,
}: ChatPalyGroundProp) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [liveMessage, setLiveMessage] = useState({ message: "" });
  const [typingUser, setTypingUser] = useState("");
  const divRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/messages?id=1`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          const { data } = await res.json();
          if (Array.isArray(data)) {
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
  }, [liveMessage]);

  socket.on("message", (data) => {
    const { message, name } = data;
    setTypingUser("");
    setLiveMessage({ message: message });
    if (divRef.current) divRef.current.scrollTop = divRef.current.scrollHeight;
  });

  let activityTimer: any;

  socket.on("activity", (name) => {
    setTypingUser(`${name} is typing...`);
    clearInterval(activityTimer);
    activityTimer = setTimeout(() => {
      setTypingUser("");
    }, 1000);
  });

  return (
    <div
      ref={divRef}
      className="flex-1 bg-neutral-100 dark:bg-neutral-800 h-full w-full "
    >
      <ScrollArea className="h-[85%] px-1">
        {messages && messages.length > 0 ? (
          <div className="px-5 py-3 flex flex-col-reverse">
            {messages.map((message) => {
              return (
                <div
                  className="flex justify-start items-center gap-4 my-5"
                  key={message.messageId}
                >
                  <Avatar className="h-11 w-11">
                    <AvatarImage
                      src={`${
                        message.userImg && message.userImg === "img"
                          ? "/userProfile.png"
                          : message.userId ===
                            "13f87cc8-4370-43d3-9020-6d7be7e380b3"
                          ? "/admin_icon_dark.png"
                          : message.userImg
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
                      <span>{new String(message.createdAt)}</span>
                    </div>
                    <p>{message.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <LottieProvider
            src={lottieJSON.loadingLottie}
            className="sm:w-[350px] lg:w-[400px] "
          />
        )}
      </ScrollArea>
      {typingUser !== "" ? (
        <p className="px-5 py-2 text-neutral-400 italic">{typingUser}</p>
      ) : (
        <p className="opacity-0 px-5 py-2 text-neutral-400 italic">
          placeholder
        </p>
      )}

      <InputForm
        socket={socket}
        currentUserName={currentUserName}
        currentUserId={currentUserId}
      />
    </div>
  );
};

export default ChatPalyGround;
