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
import { useRegisterUser } from "@/services/hooks/use-auth";
import toast from "react-hot-toast";
import { useNavigate } from "@tanstack/react-router";
const RegisterPage = () => {
  const navigate = useNavigate({});
  const registerUser = useRegisterUser();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof schema>) {
    registerUser.mutate(
      {
        email: values.email,
        name: values.name,
        password: values.password,
      },
      {
        onSuccess: (data) => {
          if (data) {
            toast.success(data.message);
          }
          form.reset();
          navigate({
            to: "/auth/login",
          });
        },
      }
    );
  }
  return (
    <>
      <p>logo</p>
      <p className="mt-4 text-xl font-bold tracking-tight">
        Sign up for Frame Pik
      </p>

      <Form {...form}>
        <form
          className="w-full space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Full Name"
                    className="w-full"
                    {...field}
                    maxLength={256}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    maxLength={256}
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
                    maxLength={33}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full mt-4"
            loading={registerUser.isPending}
          >
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

export default RegisterPage;
