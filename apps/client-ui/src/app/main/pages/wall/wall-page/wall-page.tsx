import React from 'react';
import classes from './wall-page.module.scss';
import { MdOutlineAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Group,
  Select,
  SimpleGrid,
  Skeleton,
  Stack,
  Tabs,
  Text,
  Title,
} from '@mantine/core';

const WallPage = () => {
  return (
    <Box>
      <Box>
        <Grid mb="xl">
          <Grid.Col span={6}>
            <Group align="center"></Group>
          </Grid.Col>
          <Grid.Col span={6}>
            <Group justify="end" align="center">
              <Select placeholder="Pick value" data={['React', 'Angular', 'Vue', 'Svelte']} />
              <Button
                variant="gradient"
                component={Link}
                to="/wall/create"
                leftSection={<MdOutlineAdd size={20} />}
              >
                Create a wall
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
        <Grid>
          {Array(62)
            .fill(0)
            .map((_, index) => (
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
            ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default WallPage;
