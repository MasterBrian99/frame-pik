import classes from './layout.module.scss';
import { Outlet } from 'react-router-dom';
import {
  Box, Paper
} from '@mantine/core';

const Layout = () => {
  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        {/* <Outlet/> */}
        <Box>
          <Paper withBorder shadow="md" p={30} radius="md" className={classes.paper}>
           <Outlet/>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
