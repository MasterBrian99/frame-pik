import React, { useEffect, useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { Box, Center, Grid, Loader, Skeleton, TextInput } from '@mantine/core';
import { useDebouncedValue, useInViewport } from '@mantine/hooks';
import CollectionCard from '@/app/profile/pages/collection-page/components/collection-card/collection-card';
import useQueryParams from '@/hooks/use-query-params';
import { useCollectionCurrentUser } from '@/services/hooks/use-collection';
import CollectionUpload from './components/collection-upload/collection-upload';

const CollectionPage = () => {
  const { getQueryParamByKey, setQueryParam } = useQueryParams();
  // const searchValue = getQueryParamByKey('search') || '';

  const [searchValue, setSearchValue] = useState(getQueryParamByKey('search') || '');
  const [debounced] = useDebouncedValue(searchValue, 400);
  useEffect(() => {
    setQueryParam('search', debounced);
  }, [debounced]);

  const { ref, inViewport } = useInViewport();
  const collectionList = useCollectionCurrentUser(debounced, 20);
  useEffect(() => {
    if (inViewport) {
      collectionList.fetchNextPage();
    }
  }, [inViewport]);

  return (
    <Box>
      <Grid my="md" justify="space-between">
        <Grid.Col span={10}>
          <TextInput
            leftSection={<SearchIcon size={19} />}
            radius="xl"
            value={searchValue}
            onChange={(event) => setSearchValue(event.currentTarget.value)}
            name="search"
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <CollectionUpload collectionList={collectionList} />
        </Grid.Col>
      </Grid>

      <Grid>
        {collectionList.isLoading && (
          <>
            {Array.from({ length: 12 }).map((_, i) => (
              <Grid.Col
                key={i}
                span={{
                  xs: 6,
                  sm: 6,
                  md: 6,
                  lg: 4,
                  xl: 3,
                }}
              >
                <Skeleton height={200} mb="xl" radius="md" />
              </Grid.Col>
            ))}
          </>
        )}
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
                      thumbnailPath={coll.thumbnailPath}
                    />
                  </Grid.Col>
                ))}
            </React.Fragment>
          ))}
        {collectionList.isFetchingNextPage &&
          Array.from({ length: 3 }).map((_, i) => (
            <Grid.Col
              key={i}
              span={{
                xs: 6,
                sm: 6,
                md: 6,
                lg: 4,
                xl: 3,
              }}
            >
              <Skeleton height={200} mb="xl" radius="md" />
            </Grid.Col>
          ))}
      </Grid>

      <Center my="xl" ref={ref}>
        {collectionList.isFetchingNextPage && <Loader />}
      </Center>
    </Box>
  );
};

export default CollectionPage;
