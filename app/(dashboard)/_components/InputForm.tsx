import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { SendIcon } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { Socket } from "socket.io-client";

interface InputFormProp {
  socket: Socket;
  currentUserName?: string | null;
  currentUserId: string;
}

const InputForm = ({
  socket,
  currentUserName,
  currentUserId,
}: InputFormProp) => {
  const [inputText, setInputText] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await fetch("http://localhost:3000/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: inputText,
        roomId: 1,
        userId: currentUserId,
      }),
    });

    socket.emit("message", {
      name: currentUserName,
      text: inputText,
    });

    if (inputRef.current) {
      setInputText("");
      inputRef.current.focus();
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex justify-between  items-center w-full gap-3 px-3"
    >
      <Input
        onChange={(e) => {
          setInputText(e.target.value);
          socket.emit("activity", currentUserName);
        }}
        value={inputText}
        ref={inputRef}
        className="h-12 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Message..."
        required
        autoSave="false"
        autoComplete="false"
        autoCorrect="false"
      />

      <Button type="submit">
        <SendIcon />{" "}
      </Button>
    </form>
  );
};

export default InputForm;
