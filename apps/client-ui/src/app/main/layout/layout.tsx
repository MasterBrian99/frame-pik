import classes from './layout.module.scss';
import { GoArrowRight, GoHomeFill } from 'react-icons/go';
import { MdSearch, MdTimer } from 'react-icons/md';
import { VscSettings } from 'react-icons/vsc';
import { Outlet } from 'react-router-dom';
import {
  ActionIcon,
  AppShell,
  Burger,
  Flex,
  Group,
  Image,
  NavLink,
  rem,
  ScrollArea,
  Skeleton,
  TextInput,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ColorSchemeToggle } from '@/components/color-scheme-toggle/color-scheme-toggle';
import UserMenu from '@/components/user-menu/user-menu';

// import { MantineLogo } from '@mantinex/mantine-logo';
const Layout = () => {
  const [opened, { toggle }] = useDisclosure();
  const { colorScheme } = useMantineColorScheme();

  return (
    <AppShell
      layout="alt"
      header={{ height: 70 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          {/* <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Grid w="100%">
            <Grid.Col span={9}>
              <TextInput placeholder="Search..." radius="md" />
            </Grid.Col>
            <Grid.Col span={3}>
              <ActionIcon variant="light" aria-label="Settings">
                <VscSettings style={{ width: '70%', height: '70%' }} stroke="1.5" />
              </ActionIcon>
              <ActionIcon variant="light" aria-label="Settings">
                <VscSettings style={{ width: '70%', height: '70%' }} stroke="1.5" />
              </ActionIcon>
            </Grid.Col>
          </Grid> */}
          <Group h="100%" align="center" w="100%" justify="space-between">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Flex align="center">
              <TextInput
                radius="xl"
                size="lg"
                placeholder="Search images...."
                rightSectionWidth={42}
                leftSection={<MdSearch style={{ width: rem(18), height: rem(18) }} stroke="1.5" />}
                rightSection={
                  <ActionIcon size={32} radius="xl" variant="filled">
                    <GoArrowRight style={{ width: rem(18), height: rem(18) }} stroke="1.5" />
                  </ActionIcon>
                }
              />
            </Flex>
            <Flex align="center">
              <ColorSchemeToggle />
              <ActionIcon size="xl" variant="light" aria-label="Settings" radius="xl">
                <VscSettings style={{ width: '70%', height: '70%' }} stroke="1.5" />
              </ActionIcon>
            </Flex>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <AppShell.Section>
          <Flex>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Group justify="center">
              {/* <Text>Navbar</Text> */}
              <Group justify="center" align="center">
                <Image
                  w={200}
                  src={colorScheme === 'light' ? '/frame-pik-dark.png' : '/frame-pik-light.png'}
                />
              </Group>
            </Group>
          </Flex>
        </AppShell.Section>
        <AppShell.Section grow my="md" component={ScrollArea}>
          <NavLink
            classNames={{
              root: classes.customNavLink_root,
            }}
            href="#required-for-focus"
            label="Home"
            leftSection={<GoHomeFill size="1.5rem" />}
          />
          <NavLink
            classNames={{
              root: classes.customNavLink_root,
            }}
            href="#required-for-focus"
            label="Recent"
            leftSection={<MdTimer size="1.5rem" />}
            active
          />
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} h={28} mt="sm" animate={false} />
            ))}
        </AppShell.Section>
        <AppShell.Section>
          <UserMenu />
        </AppShell.Section>

        {/* {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))} */}
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
