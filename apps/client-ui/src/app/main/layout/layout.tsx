import classes from './layout.module.scss';
import { MdHome, MdPhotoAlbum } from 'react-icons/md';
import {
  AppShell,
  Box,
  Burger, Flex,
  Group,
  Image,
  NavLink,
  ScrollArea,
  Skeleton, Text,
  Title, useMantineColorScheme
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ColorSchemeToggle } from '@/components/color-scheme-toggle/color-scheme-toggle';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const { colorScheme } = useMantineColorScheme();

  return (
    <AppShell
  
      layout="alt"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" w="100%">
          <Flex justify="space-between" align="center" w="100%">
            <Flex justify="center" align="center">
              <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
              <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
              <Group justify="center" align="center">
                <Image
                  w={120}
                  src={colorScheme === 'light' ? '/frame-pik-dark.png' : '/frame-pik-light.png'}
                />
              </Group>
            </Flex>
            <Box>
              <ColorSchemeToggle />
            </Box>
          </Flex>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md"   className={classes.navbar}>
        <AppShell.Section>
          <Group>
            <Group justify="center" align="center" w="100%">
              <Image
                className={classes.profileImage}
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.the-sun.com%2Fwp-content%2Fuploads%2Fsites%2F6%2F2021%2F01%2FNA-Joe-biden-impeachment-comp-2.jpg&f=1&nofb=1"
              />
            </Group>
            <Flex justify="center" direction="column" align="center" w="100%">
              <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
              <Title order={3}>Brian MC</Title>
              <Title order={6} c="dimmed">
                @asd
              </Title>
            </Flex>
          </Group>
        </AppShell.Section>
        <AppShell.Section grow my="md" component={ScrollArea}>
          <Box mb="sm">
            <NavLink
              href="#required-for-focus"
              label="Home"
              variant="filled"
              leftSection={<MdHome size="1.5rem" />}
            />
             <NavLink
              href="#required-for-focus"
              label="Ablums"
              variant="filled"
              leftSection={<MdPhotoAlbum size="1.5rem" />}
            />

          </Box>
        <Box>
        <Text size="sm" fw={500} c="dimmed">
            Collections
          </Text>
          <NavLink
              href="#required-for-focus"
              label="Home"
              variant="filled"
              leftSection={<MdHome size="1.5rem" />}
            />
             <NavLink
              href="#required-for-focus"
              label="Ablums"
              variant="filled"
              leftSection={<MdPhotoAlbum size="1.5rem" />}
            />
        </Box>

          {Array(60)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} h={28} mt="sm" animate={false} />
            ))}
        </AppShell.Section>
        <AppShell.Section>Navbar footer – always at the bottom</AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
       <Outlet/>
      </AppShell.Main>
    </AppShell>
  );
}
