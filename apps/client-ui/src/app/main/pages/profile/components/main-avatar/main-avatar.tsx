import { Camera } from 'lucide-react';
import { ActionIcon, Avatar, Box, FileButton, Flex, LoadingOverlay } from '@mantine/core';
import { useUploadProfileImage, useUserProfile } from '@/services/hooks/use-user';

const MainAvatar = () => {
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

  return (
    <Flex justify="center" align="center" direction="column">
      <Box pos="relative">
        <Avatar
          src={profileImage.isSuccess ? URL.createObjectURL(profileImage.data) : ''}
          size={200}
          radius={120}
          mx="auto"
        />
        <Box>
          <LoadingOverlay visible={profileImage.isLoading || uploadProfileImage.isPending} />
        </Box>
      </Box>
      <FileButton onChange={handleUpload} accept="image/png,image/jpeg">
        {(props) => (
          <ActionIcon {...props} variant="transparent" aria-label="Upload photo" mt="xs">
            <Camera />
          </ActionIcon>
        )}
      </FileButton>
    </Flex>
  );
};

export default MainAvatar;
