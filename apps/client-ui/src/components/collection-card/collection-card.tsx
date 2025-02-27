import classes from './collection-card.module.scss';
import { Eye, ImageIcon } from 'lucide-react';
import {
  Box,
  Card,
  Center,
  Flex,
  Group,
  Image,
  Overlay,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useAuth } from '@/provider/auth-provider';

// import defaultCover from '/default-collection-card.jpg';
interface Props {
  id: number;
  name: string;
  description: string;
  views: number;
  thumbnailAvaliable: boolean;
  albumCount: number;
  thumbnailPath: string | null;
}
const CollectionCard = ({
  description,
  name,
  thumbnailAvaliable,
  views,
  albumCount,
  id,
  thumbnailPath,
}: Props) => {
  const { imageToken } = useAuth();

  const theme = useMantineTheme();

  const backgroundImage = thumbnailAvaliable
    ? `${import.meta.env.VITE_BASE_URL}/cdn/collection-thumbnail/${thumbnailPath || ''}?token=${imageToken}&format=THUMBNAIL`
    : `/default-collection-card.jpg`;
  return (
    // `
    <Card key={id} shadow="sm" padding="lg" radius="md" withBorder className={classes.card}>
      <Image
        src={backgroundImage}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
        fit="cover"
      />
      <Overlay className={classes.overlay} opacity={0.55} zIndex={0} />
      <Card.Section className={classes.content}>
        <Flex justify="center" h="100%" direction="column" pos="relative">
          <Text size="xl" fw="bold" truncate="end">
            {name}
          </Text>
          <Text size="sm" mt="md" lineClamp={3}>
            {description}
          </Text>
          <Box className={classes.cardItems}>
            <Group gap="lg">
              <Center>
                <Eye size={18} color={theme.colors.dark[2]} />
                <Text size="sm" ml="3">
                  {views}
                </Text>
              </Center>
              <Center>
                <ImageIcon size={16} color={theme.colors.dark[2]} />
                <Text size="sm" ml="3">
                  {albumCount}
                </Text>
              </Center>
            </Group>
          </Box>
        </Flex>
      </Card.Section>
    </Card>
  );
};

export default CollectionCard;
