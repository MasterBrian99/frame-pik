import { nprogress } from '@mantine/nprogress';

let isInProgress = false;

nprogress.stop();

export const startProgress = () => {
  if (!isInProgress) {
    isInProgress = true;
    nprogress.start();
  }
};

export const endProgress = () => {
  if (isInProgress) {
    isInProgress = false;
    nprogress.complete();
  }
};
