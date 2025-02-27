import React from 'react';
import classes from './main-avatar.module.scss';
import { Camera } from 'lucide-react';
import { ActionIcon, Avatar, Box, FileButton, LoadingOverlay } from '@mantine/core';
import { useAuth } from '@/provider/auth-provider';
import { useUploadProfileImage, useUserProfile } from '@/services/hooks/use-user';

const MainAvatar = () => {
  const { imageToken } = useAuth();

  const profileImage = useUserProfile();
  const uploadProfileImage = useUploadProfileImage();
  function handleUpload(file: File | null) {
    if (file) {
      const data = new FormData();
      data.append('file', file);
      uploadProfileImage.mutate(data, {
        onSuccess: async () => {
          await profileImage.refetch();
        },
      });
    }
  }
  const backgroundImage = profileImage.data?.data
    ? `${import.meta.env.VITE_BASE_URL}/cdn/profile-image/${profileImage.data?.data || ''}?token=${imageToken}&format=ORIGINAL`
    : `/default-collection-card.jpg`;
  return (
    <Box className={classes.container}>
      <Avatar
        src={profileImage.isSuccess ? backgroundImage : ''}
        alt="it's me"
        className={classes.image}
      />
      <Box>
        <LoadingOverlay visible={profileImage.isLoading || uploadProfileImage.isPending} />
      </Box>
      <Box className={classes.upload}>
        <FileButton onChange={handleUpload} accept="image/png,image/jpeg">
          {(props) => (
            <ActionIcon {...props} variant="filled" aria-label="Settings" radius="xl" size="xl">
              <Camera />
            </ActionIcon>
          )}
        </FileButton>
        {/* <ActionIcon variant="white" aria-label="Settings" radius="xl" size="xl">
        <Camera style={{ width: '70%', height: '70%' }} />
      </ActionIcon> */}
      </Box>
    </Box>
  );
};

export default MainAvatar;
