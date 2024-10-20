import classes from './profile-page.module.scss';
import { GoPlus } from 'react-icons/go';
import {
  ActionIcon,
  Box,
  Card,
  Flex,
  Grid,
  Group,
  Image,
  SimpleGrid,
  Skeleton,
  Stack,
  Tabs,
  Text,
  Title,
} from '@mantine/core';

const ProfilePage = () => {
  return (
    <Box>
      <Flex direction="column" justify="center" align="center">
        <Image src="/profile_temp.png" className={classes.profileImage} alt="profile" />
        <Title order={2} c="dimmed" mt="md">
          Brian MC
        </Title>
        <Title order={6}>@brianmc</Title>
      </Flex>
      <Tabs radius="xl" variant="pills" defaultValue="first">
        <Flex justify="center" my="lg">
          <Tabs.List justify="center">
            <Tabs.Tab value="first">Snaps</Tabs.Tab>
            <Tabs.Tab value="second">Wall</Tabs.Tab>
          </Tabs.List>
        </Flex>

        <Box my="xl">
          <Tabs.Panel value="first">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum nulla iste, dolores esse
            explicabo sed fuga provident molestias, voluptas totam id quod corporis magni similique
            veritatis. Necessitatibus eaque adipisci totam! First panel
          </Tabs.Panel>
          <Tabs.Panel value="second">
            <Group justify="end">
              <ActionIcon size="xl" variant="transparent" aria-label="Settings">
                <GoPlus style={{ width: '70%', height: '70%' }} stroke="1.5" />
              </ActionIcon>
            </Group>
            <Box>
              <Grid>
                <Grid.Col span={3}>
                  <Box>
                    <Card shadow="sm" padding="lg" radius="lg" withBorder>
                      <Card.Section p="xs">
                        <SimpleGrid cols={{ base: 1, sm: 2 }}>
                          <Skeleton animate radius="md" />
                          <Stack>
                            <Skeleton h={100} animate radius="md" />
                            <Skeleton h={100} animate radius="md" />
                          </Stack>
                        </SimpleGrid>
                      </Card.Section>
                      <Box>
                        <Title order={4}>Naasdddddd ddddddddddddddde</Title>
                        <Text size="sm" c="dimmed">
                          999 Snaps
                        </Text>
                      </Box>
                    </Card>
                  </Box>
                </Grid.Col>
              </Grid>
            </Box>
          </Tabs.Panel>
        </Box>
      </Tabs>
    </Box>
  );
};

export default ProfilePage;
