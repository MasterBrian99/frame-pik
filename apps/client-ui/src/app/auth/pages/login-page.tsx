import React from 'react';
import { Anchor, Box, Button, Group, PasswordInput, Text, TextInput, Title } from '@mantine/core';

const LoginPage = () => {
  return (
    <Box>
      <Box>
        <Title ta="center" fz="h1">
          Welcome back!
        </Title>
        <Text size="sm" ta="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
        </Text>
      </Box>
      <TextInput label="Email" placeholder="you@mantine.dev" required />
      <PasswordInput label="Password" placeholder="Your password" required mt="md" />
      <Group justify="space-between" mt="lg">
        <Anchor component="button" size="sm">
          Forgot password?
        </Anchor>
      </Group>
      <Button fullWidth mt="xl">
        Sign in
      </Button>
    </Box>
  );
};

export default LoginPage;
