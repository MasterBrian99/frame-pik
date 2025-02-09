import { Box, Flex, Grid } from '@mantine/core';
import CollectionCard from '../../components/collection-card/collection-card';
import CollectionUpload from '../../components/collection-upload/collection-upload';

const CollectionPage = () => {
  return (
    <Box>
      <Flex justify="end">
        <CollectionUpload />
      </Flex>
      <Grid>
        <Grid.Col span={3}>
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
        </Grid.Col>
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
