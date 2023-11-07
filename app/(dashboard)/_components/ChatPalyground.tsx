"use client";

interface ChatPalyGroundProp {
  roomId: number;
}

const ChatPalyGround = ({ roomId }: ChatPalyGroundProp) => {
  return (
    <div className="flex-1 bg-neutral-100 dark:bg-neutral-800 h-full w-full">
      <div>{roomId}</div>
    </div>
  );
};

export default ChatPalyGround;
