import classes from './profile-page.module.scss';
import { Camera } from 'lucide-react';
import { ActionIcon, Avatar, Box, Flex, Image, Text } from '@mantine/core';

const ProfilePage = () => {
  return (
    <Box>
      <Box className={classes.imageContainer}>
        <Image
          h={300}
          radius="md"
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
        />
       
        <Box className={classes.profileContainer}>
          <Avatar
            src="/default-profile.jpg"
            alt="it's me"
            className={classes.profileContainerImage}
          />
          <Box className={classes.profileContainerUpload}>
            <ActionIcon variant="white" aria-label="Settings" radius="xl" size="xl">
              <Camera style={{ width: '70%', height: '70%' }} />
            </ActionIcon>
          </Box>
        </Box>
      </Box>
      <Flex className={classes.textContainer} justify="center" direction="column" align="center">
        <Text fz="h1" fw="bold">
          @brian
        </Text>

        <Text fz="p">brian@gmail.com</Text>
      </Flex>
    </Box>
  );
};

export default ProfilePage;
