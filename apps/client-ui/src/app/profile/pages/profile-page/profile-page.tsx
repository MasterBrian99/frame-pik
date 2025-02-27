import classes from './profile-page.module.scss';
import { Box, Flex, Image, Text } from '@mantine/core';
import MainAvatar from './components/main-avatar';

const ProfilePage = () => {
  return (
    <Box>
      <Box className={classes.imageContainer}>
        <Image
          h={300}
          radius="md"
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
        />

        <MainAvatar />
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
