import { FaMoon, FaRegSun } from 'react-icons/fa';
import { ActionIcon, rem, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';

export function ColorSchemeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant="light"
      size="xl"
      aria-label="Toggle color scheme"
      radius="xl"
      mr="sm"
    >
      {colorScheme === 'dark' && <FaRegSun style={{ width: rem(20), height: rem(20) }} />}
      {colorScheme === 'light' && <FaMoon style={{ width: rem(20), height: rem(20) }} />}
      {/* <GoSun className={classes.icon} /> */}
      {/* <GoMoon className={classes.icon} /> */}
    </ActionIcon>
  );
}
{
  /* <Group justify="center" mt="xl">
      <Button onClick={() => setColorScheme('light')}>Light</Button>
      <Button onClick={() => setColorScheme('dark')}>Dark</Button>
      <Button onClick={() => setColorScheme('auto')}>Auto</Button>
    </Group> */
}
