import { useState } from 'react';
import { Box, Button, Flex, Tabs, Text } from '@mantine/core';
import MainAvatar from './components/main-avatar';
import classes from './profile-page.module.css';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<string | null>('snaps');

  return (
    <Box>
      <Flex justify="center" align="center" direction="column" mt="100">
        <MainAvatar />

        <Text ta="center" fz="h2" fw={800}>
          Jane Fingerlicker
        </Text>
        <Text ta="center" c="dimmed" fz="sm">
          jfingerlicker@me.io • Art director
        </Text>

        <Flex gap="lg">
          <Button variant="outline" mt="md">
            Update Profile
          </Button>
          <Button variant="outline" mt="md">
            Update Profile
          </Button>
        </Flex>
      </Flex>
      <Box mt="xl">
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List
            classNames={{
              list: classes.tabList,
            }}
            justify="center"
          >
            <Tabs.Tab value="snaps">Snaps</Tabs.Tab>
            <Tabs.Tab value="collections">Collections</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="snaps">First panel</Tabs.Panel>
          <Tabs.Panel value="collections">Second panel</Tabs.Panel>
        </Tabs>
      </Box>
    </Box>
  );
};

export default ProfilePage;
