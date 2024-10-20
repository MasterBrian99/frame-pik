import classes from './user-menu.module.scss';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Avatar, Group, Menu, rem, Text, UnstyledButton } from '@mantine/core';

const UserMenu = () => {
  return (
    <Menu shadow="md" width={200} position="right-end" offset={2}>
      <Menu.Target>
        <UnstyledButton className={classes.user}>
          <Group>
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
              radius="xl"
            />

            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                Harriette Spoonlicker
              </Text>

              <Text c="dimmed" size="xs">
                hspoonlicker@outlook.com
              </Text>
            </div>

            <MdKeyboardArrowRight style={{ width: rem(18), height: rem(18) }} />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Item>Messages</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserMenu;
