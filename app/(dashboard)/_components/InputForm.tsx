import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerForm = z.object({
  message: z.string().min(1, {
    message: "message can not be empty",
  }),
});

const InputForm = () => {
  const form = useForm<z.infer<typeof registerForm>>({
    resolver: zodResolver(registerForm),
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit(value: z.infer<typeof registerForm>) {}

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
