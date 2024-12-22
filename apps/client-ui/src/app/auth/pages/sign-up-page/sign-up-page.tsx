import classes from '../pages.module.scss';
import { useMutation } from '@tanstack/react-query';
import Joi from 'joi';
import { joiResolver } from 'mantine-form-joi-resolver';
import { useNavigate } from 'react-router-dom';
import {
  Anchor,
  Button,
  Checkbox,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { loginUser, registerUser } from '@/api/auth';
import { useAuth } from '@/provider/auth-provider';
import customNotification from '@/shared/notifications';
import { AuthRegisterRequestT } from '@/types/auth';

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
  name: Joi.string()
    .required()
    .messages({
      'string.empty': 'Name is required',
    })
    .max(255)
    .messages({
      'string.max': 'Name must be less than 255 characters',
    }),
});

export default function SignUpPage() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const form = useForm<AuthRegisterRequestT>({
    mode: 'uncontrolled',
    initialValues: {
      password: '',
      email: '',
      name: '',
    },
    validate: joiResolver(schema),
  });
  const mutation = useMutation({
    mutationFn: (user: AuthRegisterRequestT) => {
      return registerUser(user);
    },
  });

  function submitForm(values: AuthRegisterRequestT) {
    mutation.mutate(values, {
      onSuccess: (data) => {
        if (data) {
          customNotification('success', {
            title: 'Success',
            message: data.message,
          });
          setTimeout(() => {
            navigate('/auth/login', { replace: true });
          }, 500);
        }
      },
    });
  }
  return (
    <Paper className={classes.form} radius={0} p={30} pos="relative">
      <LoadingOverlay visible={mutation.isPending} />
      <form onSubmit={form.onSubmit((values) => submitForm(values))}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          FramePik
        </Title>
        <TextInput
          key={form.key('name')}
          {...form.getInputProps('name')}
          label="Name"
          placeholder="brian mc"
          size="md"
        />
        <TextInput
          key={form.key('email')}
          {...form.getInputProps('email')}
          label="Email address"
          placeholder="hello@gmail.com"
          size="md"
          mt="md"
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
          Register
        </Button>

        <Text ta="center" mt="md">
          Already have an account?{' '}
          <Anchor<'a'> href="/auth/login" fw={700}>
            Login
          </Anchor>
        </Text>
      </form>
    </Paper>
  );
}
