import React from 'react';
import { Eye, Image } from 'lucide-react';
import { Card, Center, Group, Text, useMantineTheme } from '@mantine/core';
import { useCollectionThumbnail } from '@/services/hooks/use-collection';
import defaultCover from '../../../../../../assets/18-0355112-65a9a12e82913.png';
import classes from './collection-card.module.css';

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
  return (
    <Card
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="md"
      component="a"
      href="https://mantine.dev/"
      target="_blank"
    >
      <div
        className={classes.image}
        style={{
          // backgroundImage: `${thumbnail.isSuccess && thumbnailAvaliable ? `url(${URL.createObjectURL(thumbnail.data)})` : ''}`,
          backgroundImage: `${thumbnail.isSuccess && thumbnailAvaliable ? `url(${URL.createObjectURL(thumbnail.data)})` : `url(${defaultCover})`}`,
        }}
      />
      <div className={classes.overlay} />

      <div className={classes.content}>
        <div>
          <Text size="lg" className={classes.title} fw={700}>
            {name}
          </Text>

          <Group justify="space-between" gap="xs">
            <Text size="sm" className={classes.author}>
              {description}
            </Text>

            <Group gap="lg">
              <Center>
                <Eye size={16} color={theme.colors.dark[2]} />
                <Text size="sm" className={classes.bodyText}>
                  {views}
                </Text>
              </Center>
              <Center>
                <Image size={16} color={theme.colors.dark[2]} />
                <Text size="sm" className={classes.bodyText}>
                  {albumCount}
                </Text>
              </Center>
            </Group>
          </Group>
        </div>
      </div>
    </Card>
  );
};

export default CollectionCard;
