import { useState } from 'react';
import classes from './profile-page.module.scss';
import {
  BackgroundImage,
  Box, Center,
  Flex, Group,
  Image,
  Paper,
  Stack,
  Tabs,
  Title
} from '@mantine/core';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<string | null>('first');

  return (
    <Box>
      <Paper withBorder mx="auto" radius="lg" pb="md">
        <BackgroundImage
          className={classes.coverImage}
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-6.png"
        >
          <Group justify="center" align="end" h="100%">
            <Image
              className={classes.profileImage}
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
            />
          </Group>
        </BackgroundImage>
        <Box mt="xl">
          <Flex mt="xl" justify="center" direction="column" align="center">
            <Stack gap={0} mt="sm">
              <Center>
                <Title order={3} mt="md">
                  Brian MC
                </Title>
              </Center>
              <Center>
                <Title order={6} c="dimmed">
                  @brianmc
                </Title>
              </Center>
            </Stack>
          </Flex>
        </Box>
        <Box px="md">
          
              <Tabs value={activeTab} onChange={setActiveTab}>
                <Tabs.List>
                  <Tabs.Tab value="first">First tab</Tabs.Tab>
                  <Tabs.Tab value="second">Second tab</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="first">
                  <Box>s</Box>
                </Tabs.Panel>
                <Tabs.Panel value="second">Second panel</Tabs.Panel>
              </Tabs>
           
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfilePage;
