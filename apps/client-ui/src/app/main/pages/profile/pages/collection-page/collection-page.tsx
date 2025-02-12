import React from 'react';
import { Box, Button, Flex, Grid } from '@mantine/core';
import { useCollectionCurrentUser } from '@/services/hooks/use-collection';
import CollectionCard from '../../components/collection-card/collection-card';
import CollectionUpload from '../../components/collection-upload/collection-upload';

const CollectionPage = () => {
  // const collectionList = useCollectionCurrentUser();
  const collectionList = useCollectionCurrentUser();

  return (
    <Box>
      <Flex justify="end">
        <Button onClick={() => collectionList.fetchNextPage()}>asd</Button>
        <CollectionUpload collectionList={collectionList} />
      </Flex>
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
                  <Grid.Col span={3} key={coll.id}>
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
        {/* <Grid.Col span={3}>
          <CollectionCard />
        </Grid.Col>
        <Grid.Col span={3}>
          <CollectionCard />
        </Grid.Col>
        <Grid.Col span={3}>
          <CollectionCard />
        </Grid.Col>
        <Grid.Col span={3}>
          <CollectionCard />
        </Grid.Col> */}
      </Grid>
    </Box>
  );
};

export default CollectionPage;

// const child = <Skeleton height={140} radius="md" animate={false} />;
// const chil2 = <Skeleton height={70} radius="md" animate={false} />;

{
  /* <Grid>
<Grid.Col span={3}>
  <Box>
    <Grid gutter={2}>
      <Grid.Col span={{ base: 12, xs: 3 }}>{child}</Grid.Col>
      <Grid.Col span={{ base: 12, xs: 5 }}>{child}</Grid.Col>
      <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
    </Grid>
  </Box>
</Grid.Col>
<Grid.Col span={3}>
  <Box>
    <Grid gutter={2}>
      <Grid.Col span={{ base: 12, xs: 12 }}>{chil2}</Grid.Col>
      <Grid.Col span={{ base: 12, xs: 6 }}>{chil2}</Grid.Col>
      <Grid.Col span={{ base: 12, xs: 6 }}>{chil2}</Grid.Col>
    </Grid>
  </Box>
</Grid.Col>
<Grid.Col span={3}>
  <Box>
    <Grid gutter={2}>
      <Grid.Col span={{ base: 12, xs: 6 }}>{chil2}</Grid.Col>
      <Grid.Col span={{ base: 12, xs: 6 }}>{chil2}</Grid.Col>
      <Grid.Col span={{ base: 12, xs: 12 }}>{chil2}</Grid.Col>
    </Grid>
  </Box>
</Grid.Col>
<Grid.Col span={3}>
  <Box>
    <Grid gutter={2}>
      <Grid.Col span={{ base: 12, xs: 2 }}>{child}</Grid.Col>
      <Grid.Col span={{ base: 12, xs: 8 }}>{child}</Grid.Col>
      <Grid.Col span={{ base: 12, xs: 2 }}>{child}</Grid.Col>
    </Grid>
  </Box>
</Grid.Col>
</Grid> */
}
