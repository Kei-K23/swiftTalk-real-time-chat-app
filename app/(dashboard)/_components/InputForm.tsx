import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Socket } from "socket.io-client";
import { z } from "zod";

const registerForm = z.object({
  message: z.string().min(1, {
    message: "message can not be empty",
  }),
});

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
  const form = useForm<z.infer<typeof registerForm>>({
    resolver: zodResolver(registerForm),
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit(value: z.infer<typeof registerForm>) {
    await fetch("http://localhost:3000/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: value.message,
        roomId: 1,
        userId: currentUserId,
      }),
    });

    socket.emit("message", {
      name: currentUserName,
      text: value.message,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-between  items-center w-full gap-3 px-3"
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className="h-12 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="Message..."
                  {...field}
                  required
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">
          <SendIcon />{" "}
        </Button>
      </form>
    </Form>
  );
};

export default InputForm;
