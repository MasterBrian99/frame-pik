import React from 'react';
import { Link } from 'react-router-dom';
import { Anchor, Box, Button, PasswordInput, Text, TextInput, Title } from '@mantine/core';

const SignUpPage = () => {
  return (
    <Box>
      <Box>
        <Title ta="center" fz="h1">
          Frame Pik
        </Title>
        <Text size="sm" ta="center" mt={5}>
          Already have an account?{' '}
          <Anchor size="sm" component={Link} to="/auth/login">
            Login
          </Anchor>
        </Text>
      </Box>
      <TextInput label="Email" placeholder="you@mantine.dev" required />
      <TextInput label="Username" placeholder="brian" required mt="md" />
      <PasswordInput label="Password" placeholder="Your password" required mt="md" />
      <Button fullWidth mt="xl">
        Sign up
      </Button>
    </Box>
  );
};

export default SignUpPage;
