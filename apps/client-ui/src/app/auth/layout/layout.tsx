import {
  Box
} from '@mantine/core';
import classes from './layout.module.scss';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className={classes.wrapper}>
      <Box  className={classes.imgCredit}>
      Photo by <a href="https://unsplash.com/@lauraadaiphoto?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">laura adai</a> on <a href="https://unsplash.com/photos/black-round-analog-wall-clock-YlR_JL8mMio?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
      </Box>
    <Outlet/>
    </div>
  );
}

