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
import toast from "react-hot-toast";
import { useAuth } from "@/auth";
import { useNavigate, useRouter } from "@tanstack/react-router";

const fallback = "/dashboard" as const;

const LoginPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const router = useRouter();
  const loginUser = useLoginUser();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof schema>) {
    loginUser.mutate(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: async (data) => {
          console.log(data);
          if (data && data.data) {
            toast.success(data.message);
            await auth.login(data.data.accessToken);
            await router.invalidate();
            await navigate({ to: fallback });
          }
        },
      }
    );
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
