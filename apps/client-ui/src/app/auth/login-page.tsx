import { flushSync } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import {
  Anchor,
  Box,
  Button,
  Flex,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useAuth } from '@/provider/auth-provider';
import { useLoginUser } from '@/services/hooks/auth-auth';
import classes from './login-page.module.css';

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
  const { setToken } = useAuth();
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
    <Flex className={classes.root} justify="center" align="center">
      <Box className={classes.container}>
        <Title ta="center" className={classes.title}>
          Welcome back!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              key={form.key('email')}
              {...form.getInputProps('email')}
              withAsterisk
              label="Email"
              placeholder="you@mantine.dev"
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
            <Group justify="end" mt="lg">
              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor>
            </Group>
            <Button fullWidth mt="xl" type="submit">
              Sign in
            </Button>
          </form>
        </Paper>
      </Box>
    </Flex>
  );
};

export default LoginPage;
