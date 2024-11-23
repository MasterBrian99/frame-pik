import { showNotification } from '@mantine/notifications';

function customNotification(
  type: 'warning' | 'info' | 'success' | 'error',
  { title = '', message = '', loading = false }
) {
  showNotification({
    color:
      type === 'warning' ? 'orange' : type === 'error' ? 'red' : type === 'info' ? 'blue' : 'teal',
    withCloseButton: true,
    title,
    message,
    loading: loading,
  });
}

export default customNotification;
