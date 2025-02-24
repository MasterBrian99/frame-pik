import React, { useEffect, useState } from 'react';
// import { useCollectionThumbnail } from '@/services/hooks/use-collection';
// import defaultCover from '/default-collection-card.jpg';
import classes from './collection-card.module.scss';
import { Eye, Image } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, Center, Group, Text, useMantineTheme } from '@mantine/core';

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
  //   const thumbnail = useCollectionThumbnail(String(id), {
  //     enabled: thumbnailAvaliable && !!id,
  //   });
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  //   useEffect(() => {
  //     if (!thumbnailAvaliable) {
  //       setImageUrl(`url(${defaultCover})`);
  //       return;
  //     }
  //     if (thumbnailAvaliable) {
  //       if (thumbnail.isSuccess && thumbnail.data) {
  //         const newImageUrl = URL.createObjectURL(thumbnail.data);
  //         setImageUrl(newImageUrl);

  //         // Clean up the old URL when the data changes or component unmounts
  //         return () => {
  //           if (imageUrl) {
  //             URL.revokeObjectURL(imageUrl);
  //           }
  //         };
  //       }
  //     }
  //   }, [thumbnail.isSuccess, thumbnail.data, thumbnailAvaliable]);
  //   const backgroundImage = imageUrl ? `url(${imageUrl})` : `url(${defaultCover})`;
  const backgroundImage = `url(/default-collection-card.jpg)`;

  return (
    <Card
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="md"
      component={Link}
      to={`/profile/collections/${id}`}
    >
      <div
        className={classes.image}
        style={{
          // backgroundImage: `${thumbnail.isSuccess && thumbnailAvaliable ? `url(${URL.createObjectURL(thumbnail.data)})` : ''}`,
          backgroundImage: `${backgroundImage}`,
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
