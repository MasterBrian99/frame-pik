import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mantine/core';
import Header from '../components/header/header';

const MainLayout = () => {
  return (
    <>
      <Box pos="relative">
        <Header />
        <Box mt={60}>
          <Container size="xl">
            <Outlet />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default MainLayout;
