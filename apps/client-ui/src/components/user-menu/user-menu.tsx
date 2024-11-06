import classes from './user-menu.module.scss';
import { MdKeyboardArrowRight, MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Avatar, Group, Menu, rem, Text, UnstyledButton } from '@mantine/core';
import { useAuth } from '@/provider/auth-provider';

const UserMenu = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
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
        <Menu.Item
          onClick={() => {
            setToken(null);
            navigate('/auth/login', { replace: true });
          }}
          color="red"
          leftSection={<MdLogout style={{ width: rem(14), height: rem(14) }} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserMenu;
