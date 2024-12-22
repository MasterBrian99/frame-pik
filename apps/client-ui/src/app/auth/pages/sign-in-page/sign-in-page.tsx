import classes from '../pages.module.scss';
import { useMutation } from '@tanstack/react-query';
import Joi from 'joi';
import { joiResolver } from 'mantine-form-joi-resolver';
import { useNavigate } from 'react-router-dom';
import {
  Anchor,
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { loginUser } from '@/api/auth';
import { useAuth } from '@/provider/auth-provider';
import { AuthLoginRequestT } from '@/types/auth';

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      'string.email': 'Invalid email',
      'string.empty': 'Invalid email',
    }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
  }),
});

export default function SignInPage() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      password: '',
      email: '',
    },
    validate: joiResolver(schema),
  });
  const mutation = useMutation({
    mutationFn: (user: AuthLoginRequestT) => {
      return loginUser(user);
    },
  });

  function submitForm(values: AuthLoginRequestT) {
    mutation.mutate(values, {
      onSuccess: (data) => {
        if (data) {
          setToken(data.data.accessToken);
          navigate('/', { replace: true });
        }
      },
    });
  }
  return (
    <Paper className={classes.form} radius={0} p={30}>
      <form onSubmit={form.onSubmit((values) => submitForm(values))}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          FramePik
        </Title>

        <TextInput
          key={form.key('email')}
          {...form.getInputProps('email')}
          label="Email address"
          placeholder="hello@gmail.com"
          size="md"
        />
        <PasswordInput
          key={form.key('password')}
          {...form.getInputProps('password')}
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
        />
        <Button fullWidth mt="xl" size="md" type="submit">
          Login
        </Button>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{' '}
          <Anchor<'a'> href="/auth/register" fw={700}>
            Register
          </Anchor>
        </Text>
      </form>
    </Paper>
  );
}
