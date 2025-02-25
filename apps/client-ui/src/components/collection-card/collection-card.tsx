import { useEffect, useState } from 'react';
// import { useCollectionThumbnail } from '@/services/hooks/use-collection';
// import defaultCover from '/default-collection-card.jpg';
import classes from './collection-card.module.scss';
import { Eye, Image } from 'lucide-react';
import {
  Box, Card,
  Center,
  Flex,
  Group, Overlay,
  Text, useMantineTheme
} from '@mantine/core';
import { useCollectionThumbnail } from '@/services/hooks/use-collection';
// import defaultCover from '/default-collection-card.jpg';
interface Props {
  id: number;
  name: string;
  description: string;
  views: number;
  thumbnailAvaliable: boolean;
  albumCount: number;
}
const CollectionCard = ({
  description,
  name,
  thumbnailAvaliable,
  views,
  albumCount,
  id,
}: Props) => {
  const theme = useMantineTheme();
    const thumbnail = useCollectionThumbnail(String(id), {
      enabled: thumbnailAvaliable && !!id,
    });
  const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
      if (!thumbnailAvaliable) {
        setImageUrl(`url(/default-collection-card.jpg)`);
        return;
      }
      if (thumbnailAvaliable) {
        if (thumbnail.isSuccess && thumbnail.data) {
          const newImageUrl = URL.createObjectURL(thumbnail.data);
          setImageUrl(newImageUrl);

          // Clean up the old URL when the data changes or component unmounts
          return () => {
            if (imageUrl) {
              URL.revokeObjectURL(imageUrl);
            }
          };
        }
      }
    }, [thumbnail.isSuccess, thumbnail.data, thumbnailAvaliable]);
    const backgroundImage = imageUrl ? `url(${imageUrl})` : `url(/default-collection-card.jpg)`;
  // const backgroundImage = `url(/default-collection-card.jpg)`;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className={classes.card}
    style={{
      // backgroundImage: `${thumbnail.isSuccess && thumbnailAvaliable ? `url(${URL.createObjectURL(thumbnail.data)})` : ''}`,
      backgroundImage: `${backgroundImage}`,
    }}
    >
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
                <Image size={16} color={theme.colors.dark[2]} />
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
