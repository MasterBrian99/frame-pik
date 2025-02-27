import React from 'react';
import { Eye, ImageIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Center,
  Container,
  Group,
  Image,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useAuth } from '@/provider/auth-provider';
import { useCollectionByIdCurrentUser } from '@/services/hooks/use-collection';
import CollectionMenu from './components/collection-menu/collection-menu';

const CollectionAlbumPage = () => {
  const { imageToken } = useAuth();

  const theme = useMantineTheme();
  const { collectionId } = useParams();
  const collectionItem = useCollectionByIdCurrentUser(collectionId!, {
    enabled: !!collectionId,
    queryKey: ['collection', 'current-user', collectionId],
  });

  return (
    <Box>
      <Container>
        <Box>
          {collectionItem &&
          collectionItem.data &&
          collectionItem.data.data &&
          collectionItem.isSuccess ? (
            <>
              <Title order={3}>{collectionItem.data.data.name}</Title>
              <Text size="sm" c="dimmed">
                {collectionItem.data.data.description}
              </Text>
            </>
          ) : (
            <></>
          )}
        </Box>
        <Box my="xs">
          {collectionId &&
          collectionItem &&
          collectionItem.data &&
          collectionItem.data.data &&
          collectionItem.isSuccess ? (
            <CollectionMenu id={Number(collectionId)} />
          ) : (
            <></>
          )}
        </Box>

        <Box my="sm">
          <Box pos="relative">
            <Image
              radius="md"
              h={300}
              fit="cover"
              src={
                collectionItem.data?.data?.thumbnailAvaliable
                  ? `${import.meta.env.VITE_BASE_URL}/cdn/collection-image/${collectionItem.data?.data?.thumbnailPath || ''}?token=${imageToken}&format=ORIGINAL`
                  : `/default-collection-card.jpg`
              }
            />
            <Group justify="end" pos="absolute" bottom={10} right={10}>
              <Button variant="light">Update Cover</Button>
            </Group>
          </Box>
        </Box>
        <Group justify="end">
          {collectionItem &&
          collectionItem.data &&
          collectionItem.data.data &&
          collectionItem.isSuccess ? (
            <>
              <Center>
                <Eye size={18} color={theme.colors.dark[2]} />
                <Text size="sm" ml="3">
                  {collectionItem.data.data.views}
                </Text>
              </Center>
              <Center>
                <ImageIcon size={16} color={theme.colors.dark[2]} />
                <Text size="sm" ml="3">
                  {collectionItem.data.data.albumCount}
                </Text>
              </Center>
            </>
          ) : (
            <></>
          )}
        </Group>
      </Container>
      <Box>asd</Box>
    </Box>
  );
};

export default CollectionAlbumPage;
