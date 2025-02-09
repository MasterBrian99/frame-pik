import { ChevronRight, Sun } from 'lucide-react';
import { Avatar, Group, Menu, Text, useMantineTheme } from '@mantine/core';
import { useUserProfile } from '@/services/hooks/use-user';

const HeaderMenu = () => {
  const theme = useMantineTheme();
  const profileImage = useUserProfile();

  return (
    <Group justify="center">
      <Menu
        withArrow
        width={300}
        position="bottom"
        transitionProps={{ transition: 'pop' }}
        withinPortal
      >
        <Menu.Target>
          <Avatar
            ml="md"
            src={profileImage.isSuccess ? URL.createObjectURL(profileImage.data) : ''}
            alt="it's me"
            size="md"
          />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item rightSection={<ChevronRight size={16} />}>
            <Group>
              <Avatar
                radius="xl"
                src={profileImage.isSuccess ? URL.createObjectURL(profileImage.data) : ''}
              />

              <div>
                <Text fw={500}>Nancy Eggshacker</Text>
                <Text size="xs" c="dimmed">
                  neggshaker@mantine.dev
                </Text>
              </div>
            </Group>
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item leftSection={<Sun size={16} color={theme.colors.red[6]} />}>
            Liked posts
          </Menu.Item>
          <Menu.Item leftSection={<Sun size={16} color={theme.colors.yellow[6]} />}>
            Saved posts
          </Menu.Item>
          <Menu.Item leftSection={<Sun size={16} color={theme.colors.blue[6]} />}>
            Your comments
          </Menu.Item>

          <Menu.Label>Settings</Menu.Label>
          <Menu.Item leftSection={<Sun size={16} />}>Account settings</Menu.Item>
          <Menu.Item leftSection={<Sun size={16} />}>Change account</Menu.Item>
          <Menu.Item leftSection={<Sun size={16} />}>Logout</Menu.Item>

          <Menu.Divider />

          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item leftSection={<Sun size={16} />}>Pause subscription</Menu.Item>
          <Menu.Item color="red" leftSection={<Sun size={16} />}>
            Delete account
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};

export default HeaderMenu;
