"use client";

import { useEffect, useState } from "react";

interface ChatPalyGroundProp {
  roomId: number;
}

interface Message {
  id: number;
  message: string;
  userId: string | null;
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
          const data = await res.json();
          if (Array.isArray(data)) {
            setMessages(data);
          } else {
            console.error("Received invalid data for messages");
          }
        } else {
          console.error("Error fetching messages:", res.status, res.statusText);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [roomId]);

  return (
    <div className="flex-1 bg-neutral-100 dark:bg-neutral-800 h-full w-full">
      <div>{roomId}</div>
      {messages && messages.length > 0 ? (
        <div>
          {messages.map((message) => (
            <div key={message.id}>{message.message}</div>
          ))}
        </div>
      ) : (
        <h2>no messages to show</h2>
      )}
    </div>
  );
};

export default ChatPalyGround;
