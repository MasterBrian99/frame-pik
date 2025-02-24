import { CirclePlus, Home, Search, SearchIcon, User2 } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  ActionIcon,
  AppShell,
  Flex,
  Group,
  ScrollArea,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';

const Layout = () => {
  const navigate = useNavigate();

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      padding="md"
      navbar={{
        width: 65,
        breakpoint: 0,
      }}
    >
      {/* <AppShell.Header className={classes.root}> */}
      <AppShell.Header>
        <Group h="100%" px="md">
          <Flex justify="space-between" align="center" w="100%">
            <Text>ads</Text>
            <TextInput
              style={{
                width: '90%',
              }}
              size="md"
              leftSection={<SearchIcon size={19} />}
              radius="xl"
            />
            <Group>
              <ColorSchemeToggle />
            </Group>
          </Flex>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <AppShell.Section>
          <Flex justify="center" mb="xl">
            <Tooltip label="Home">
              <ActionIcon variant="transparent" aria-label="Home">
                <Home />
              </ActionIcon>
            </Tooltip>
          </Flex>
        </AppShell.Section>
        <AppShell.Section grow my="md" component={ScrollArea}>
          <Flex justify="center" direction="column" align="center" gap="lg">
            <Tooltip label="Add new">
              <ActionIcon variant="transparent" aria-label="Add new">
                <CirclePlus />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Profile">
              <ActionIcon variant="transparent" aria-label="Profile"
              onClick={() => navigate('/profile')}
              >
                <User2 />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Search">
              <ActionIcon variant="transparent" aria-label="Search">
                <Search />
              </ActionIcon>
            </Tooltip>
          </Flex>
        </AppShell.Section>
        <AppShell.Section>
          <Tooltip label="Add new">
            <ActionIcon variant="transparent" aria-label="Add new">
              <CirclePlus />
            </ActionIcon>
          </Tooltip>
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
