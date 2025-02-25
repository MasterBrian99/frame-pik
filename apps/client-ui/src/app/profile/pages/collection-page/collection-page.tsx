import { SearchIcon } from 'lucide-react';
import { Box, Button, Center, Grid, Loader, TextInput } from '@mantine/core';
import CollectionCard from '@/components/collection-card/collection-card';
import { useCollectionCurrentUser } from '@/services/hooks/use-collection';
import React, { useEffect, useState } from 'react';
import { useDebouncedValue, useInViewport } from '@mantine/hooks';
const CollectionPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [debounced] = useDebouncedValue(searchValue, 400);
  const { ref, inViewport } = useInViewport();
  const collectionList = useCollectionCurrentUser(debounced);
  useEffect(() => {
    if (inViewport) {
      collectionList.fetchNextPage();
    }
  }, [inViewport]);

  return (
    <Box>
      <Grid my="md" justify="space-between">
        <Grid.Col span={10}>
          <TextInput leftSection={<SearchIcon size={19} />} radius="xl"
           value={searchValue}
           onChange={(event) => setSearchValue(event.currentTarget.value)}
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <Button fullWidth radius="xl">
            Create Collection
          </Button>
        </Grid.Col>
      </Grid>

      <Grid>
      {collectionList &&
          collectionList.data &&
          collectionList.data.pages.length > 0 &&
          collectionList.data.pages.map((item, i) => (
            <React.Fragment key={i}>
              {item &&
                item.data &&
                item.data.data &&
                item.data.data.map((coll) => (
                  <Grid.Col
                    span={{
                      xs: 6,
                      sm: 6,
                      md: 6,
                      lg: 4,
                      xl: 3,
                    }}
                    key={coll.id}
                  >
                    <CollectionCard
                      id={coll.id}
                      description={coll.description}
                      name={coll.name}
                      thumbnailAvaliable={coll.thumbnailAvaliable}
                      views={coll.views}
                      albumCount={coll.albumCount}
                    />
                  </Grid.Col>
                ))}
            </React.Fragment>
          ))}

        <Grid.Col
          span={{
            xs: 6,
            sm: 6,
            md: 6,
            lg: 4,
            xl: 3,
          }}
        >
          <CollectionCard
            id={1}
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum est repellendus molestias amet quia praesentium rerum sequi natus dicta aut, animi dolores, ipsum eos. Necessitatibus minus inventore a repudiandae officiis."
            name="name"
            thumbnailAvaliable={false}
            views={200}
            albumCount={11}
          />
        </Grid.Col>
      </Grid>
      <Center my="xl" ref={ref}>
      {collectionList.isFetchingNextPage && <Loader />}
    </Center>
    </Box>
  );
};

export default CollectionPage;
