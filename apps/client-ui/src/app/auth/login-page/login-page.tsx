import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import schema from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useLoginUser } from "@/services/hooks/use-auth";
const LoginPage = () => {
  const loginUser = useLoginUser();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof schema>) {
    console.log(values);
    loginUser.mutate({
      email: values.email,
      password: values.password,
    });
  }
  return (
    <>
      <p>logo</p>
      <p className="mt-4 text-xl font-bold tracking-tight">
        Login for Frame Pik
      </p>

      <Form {...form}>
        <form
          className="w-full space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full mt-4">
            Continue with Email
          </Button>
        </form>
      </Form>
      <p className="mt-5 text-sm text-center">
        Already have an account?
        <a href="#" className="ml-1 underline text-muted-foreground">
          Log in
        </a>
      </p>
    </>
  );
};

export default LoginPage;
