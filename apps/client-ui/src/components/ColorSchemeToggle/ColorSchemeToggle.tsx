import { Moon, Sun } from 'lucide-react';
import { ActionIcon, Group, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';

export function ColorSchemeToggle() {
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <Group justify="center">
      <ActionIcon
        onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
        variant="default"
        size="lg"
        aria-label="Toggle color scheme"
        radius="xl"
        ml="md"
      >
        {colorScheme === 'dark' ? <Sun /> : <Moon />}
        {/* <Sun /> */}
        {/* <Moon /> */}
      </ActionIcon>
    </Group>
  );
}
