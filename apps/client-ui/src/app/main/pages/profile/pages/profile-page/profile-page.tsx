import {
  BackgroundImage,
  Box, Grid,
  Group,
  Image, Title
} from '@mantine/core';

const ProfilePage = () => {
  return (
    <Box>
      <Box mx="auto">
        <BackgroundImage
          style={{
            height: 300,
          }}
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-6.png"
          radius="xs"
        >
          <Group justify="end" align="end" w="100%" h="100%" pb="xs" pr="sm">
            asdasdasd
          </Group>
        </BackgroundImage>
      </Box>
      <Grid>
        <Grid.Col span={3}>
          <Image
            radius="md"
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
          />
        </Grid.Col>
        <Grid.Col span={6}>
        <Title order={2} c="dimmed" mt="md">
          Brian MC
        </Title>
        <Title order={6}>@brianmc</Title>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
