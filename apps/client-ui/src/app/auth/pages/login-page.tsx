import React from 'react';
import { Anchor, Box, Button, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

const LoginPage = () => {
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
      <TextInput label="Email" placeholder="you@mantine.dev" required />
      <PasswordInput label="Password" placeholder="Your password" required mt="md" />

      <Button fullWidth mt="xl">
        Sign in
      </Button>
    </Box>
  );
};

export default LoginPage;
