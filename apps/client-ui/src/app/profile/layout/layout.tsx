import React, { useState } from 'react';
import classes from './layout.module.scss';
import { Home,LibraryBig,Album,Image,Settings2 ,UserRoundPen} from 'lucide-react';
import {  Outlet, useNavigate } from 'react-router-dom';
import { Anchor, AppShell, Box, Burger, Flex, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';

const Layout = () => {
  const [active, setActive] = useState('Billing');
  const navigate = useNavigate();

  const [opened, { toggle }] = useDisclosure();
  const account = [
    { link: '../', label: 'Home', icon: Home },
    { link: '', label: 'Profile', icon: UserRoundPen },
    { link: 'collection', label: 'Collections', icon: LibraryBig },
    { link: '', label: 'Albums', icon: Album },
    { link: '', label: 'Snaps', icon: Image },
    { link: '', label: 'Settings', icon: Settings2 },
  ];

  const links = account.map((item) => (
    <Anchor
      className={classes.link}
      data-active={item.label === active || undefined}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        navigate(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </Anchor>
  ));
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
      <Group h="100%" px="md">
          <Flex justify="space-between" align="center" w="100%">
           <Box>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

           <Text>ads</Text>
           </Box>
            
            <Group>
              <ColorSchemeToggle />
            </Group>
          </Flex>
        </Group>
       
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <div className={classes.navbarMain}>{links}</div>
        
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
