import { Box, Flex, Grid } from '@mantine/core';
import CollectionCard from '@/components/collection-card/collection-card';

const CollectionPage = () => {
  return (
    <Box>
      <Flex justify="end">{/* <CollectionUpload collectionList={collectionList} /> */}</Flex>
      <Grid>
        {/* {collectionList &&
        collectionList.data &&
        collectionList.data.pages.length > 0 &&
        collectionList.data.pages.map((item, i) => (
          <React.Fragment key={i}>
            {item &&
              item.data &&
              item.data.data &&
              item.data.data.map((coll) => (
               
              ))}
          </React.Fragment>
        ))} */}
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
            description="description"
            name="name"
            thumbnailAvaliable={false}
            views={200}
            albumCount={11}
          />
        </Grid.Col>
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
            description="description"
            name="name"
            thumbnailAvaliable={false}
            views={200}
            albumCount={11}
          />
        </Grid.Col>
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
            description="description"
            name="name"
            thumbnailAvaliable={false}
            views={200}
            albumCount={11}
          />
        </Grid.Col>
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
            description="description"
            name="name"
            thumbnailAvaliable={false}
            views={200}
            albumCount={11}
          />
        </Grid.Col>
      </Grid>
      {/* <Center my="xl" ref={ref}>
      {collectionList.isFetchingNextPage && <Loader />}
    </Center> */}
    </Box>
  );
};

export default CollectionPage;
