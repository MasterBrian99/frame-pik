import React from 'react';
import { zodResolver } from 'mantine-form-zod-resolver';
import { flushSync } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Anchor, Box, Button, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuth } from '@/provider/auth-provider';
import { useLoginUser } from '@/services/hooks/use-auth';

const schema = z.object({
  email: z
    .string({
      required_error: 'Please enter an email',
    })
    .email({
      message: 'Please enter a valid email',
    })
    .max(255, {
      message: 'Email must be less than 255 characters',
    }),
  password: z.string({
    required_error: 'Please enter a password',
  }),
});
const LoginPage = () => {
  const { setToken, setImageToken } = useAuth();
  const navigate = useNavigate();
  const loginUser = useLoginUser();
  const form = useForm<z.infer<typeof schema>>({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },

    validate: zodResolver(schema),
  });
  function handleSubmit(values: z.infer<typeof schema>) {
    loginUser.mutate(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: async (data) => {
          if (data && data.data) {
            setToken(data.data.accessToken);
            setImageToken(data.data.token);
            flushSync(() =>
              navigate('/profile', {
                replace: true,
              })
            );
            setTimeout(() => {
              window.location.reload();
            }, 300);
          }
        },
      }
    );
  }
  return (
    <Box>
      <Box>
        <Title ta="center" fz="h1">
          Frame Pik
        </Title>
        <Text size="sm" ta="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor size="sm" component={Link} to="/auth/register">
            Create account
          </Anchor>
        </Text>
      </Box>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          key={form.key('email')}
          {...form.getInputProps('email')}
          withAsterisk
          label="Email"
          placeholder="brian@gmail.com"
          required
        />
        <PasswordInput
          withAsterisk
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          key={form.key('password')}
          {...form.getInputProps('password')}
        />

        <Button fullWidth mt="xl" type="submit">
          Sign in
        </Button>
      </form>
    </Box>
  );
};

export default LoginPage;
