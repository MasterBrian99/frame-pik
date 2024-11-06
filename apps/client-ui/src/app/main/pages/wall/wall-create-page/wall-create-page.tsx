import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Joi from 'joi';
import { MdOutlineClose, MdOutlineFileUpload, MdOutlinePhotoLibrary } from 'react-icons/md';
import {
  Box,
  Button,
  Checkbox,
  Grid,
  Group,
  Paper,
  rem,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { Dropzone, DropzoneProps, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { joiResolver, useForm } from '@mantine/form';
import { createWall } from '@/api/wall';
import customNotification from '@/shared/notifications';
import { WallCreateRequestT } from '@/types/wall';

const schema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      'string.empty': 'Name is required',
    })
    .min(1)
    .message('Name must be at least 1 characters')
    .max(100)
    .message('Name must be less than 100 characters'),
  description: Joi.optional(),
  isPublic: Joi.boolean().optional(),
});
const WallCreatePage = () => {
  const mutation = useMutation({
    mutationFn: (data: WallCreateRequestT) => {
      return createWall(data);
    },
  });

  const [files, setFiles] = useState<FileWithPath[]>([]);
  const form = useForm<WallCreateRequestT>({
    mode: 'uncontrolled',
    initialValues: {
      description: '',
      isPublic: false,
      name: '',
    },

    validate: joiResolver(schema),
  });
  function submitForm(values: WallCreateRequestT) {
    mutation.mutate(values, {
      onSuccess: (data) => {
        customNotification('success', {
          title: 'Success',
          message: data.message,
        });
        form.reset();
      },
    });
  }
  return (
    <Box>
      <Paper withBorder mx="auto" radius="md" p="sm">
        <form onSubmit={form.onSubmit((values) => submitForm(values))}>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                key={form.key('name')}
                {...form.getInputProps('name')}
                withAsterisk
                label="Wall name"
                placeholder="Wall name"
                maxLength={101}
              />
              <Checkbox
                my="sm"
                label="Make wall public"
                key={form.key('isPublic')}
                {...form.getInputProps('isPublic')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Textarea
                key={form.key('description')}
                {...form.getInputProps('description')}
                label="Description"
                placeholder="Description"
                maxLength={255}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              {/* <Text>Upload images</Text> */}
              <Dropzone
                onDrop={setFiles}
                onReject={(files) => console.log('rejected files', files)}
                maxSize={5 * 1024 ** 2}
                accept={[...IMAGE_MIME_TYPE]}
              >
                <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                  <Dropzone.Accept>
                    <MdOutlineFileUpload
                      style={{
                        width: rem(52),
                        height: rem(52),
                        color: 'var(--mantine-color-blue-6)',
                      }}
                      stroke={'1.5'}
                    />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <MdOutlineClose
                      style={{
                        width: rem(52),
                        height: rem(52),
                        color: 'var(--mantine-color-red-6)',
                      }}
                      stroke={'1.5'}
                    />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <MdOutlinePhotoLibrary
                      style={{
                        width: rem(52),
                        height: rem(52),
                        color: 'var(--mantine-color-dimmed)',
                      }}
                      stroke={'1.5'}
                    />
                  </Dropzone.Idle>

                  <div>
                    <Text size="xl" inline>
                      Drag images here or click to select files
                    </Text>
                    <Text size="sm" c="dimmed" inline mt={7}>
                      Attach as many files as you like, each file should not exceed 5mb
                    </Text>
                  </div>
                </Group>
              </Dropzone>
            </Grid.Col>
            <Grid.Col span={12}>
              <Button fullWidth mt="xl" size="md" type="submit">
                Create
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default WallCreatePage;
