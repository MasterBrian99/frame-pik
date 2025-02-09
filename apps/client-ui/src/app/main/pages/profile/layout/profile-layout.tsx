import { useState } from 'react';
import { Outlet, useNavigate, useNavigation, useParams, useSearchParams } from 'react-router-dom';
import { Box, Button, Flex, Tabs, Text } from '@mantine/core';
import MainAvatar from '../components/main-avatar/main-avatar';
import classes from './profile-layout.module.css';

const ProfileLayout = () => {
  const [activeTab, setActiveTab] = useState<string | null>(
    window.location.href.split('/').pop() || ''
  );
  const navigate = useNavigate();
  const { tabValue } = useParams();

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
        <Tabs
          value={tabValue}
          onChange={(value) => navigate(`/profile/${value}`)}
          defaultValue={window.location.href.split('/').pop() || 'snaps'}
        >
          <Tabs.List
            classNames={{
              list: classes.tabList,
            }}
            justify="center"
          >
            <Tabs.Tab value="snaps">Snaps</Tabs.Tab>
            <Tabs.Tab value="collections">Collections</Tabs.Tab>
          </Tabs.List>

          {/* <Tabs.Panel value="snaps">First panel</Tabs.Panel>
          <Tabs.Panel value="collections">Second panel</Tabs.Panel> */}
          <Outlet />
        </Tabs>
      </Box>
    </Box>
  );
};

export default ProfileLayout;
