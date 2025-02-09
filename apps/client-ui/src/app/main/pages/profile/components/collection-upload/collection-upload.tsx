import { PlusIcon } from 'lucide-react';
import { z } from 'zod';
import {
  ActionIcon,
  Button,
  FileInput,
  LoadingOverlay,
  Modal,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useCollectionCreate } from '@/services/hooks/use-collection';
import customNotification from '@/shared/notifications';

const schema = z.object({
  name: z
    .string({
      required_error: 'Please enter a collection name',
    })
    .min(1, {
      message: 'Please enter a valid collection name',
    })
    .max(255, {
      message: 'Collection name must be less than 255 characters',
    }),
  folderName: z
    .string({
      required_error: 'Please enter a folder name',
    })
    .min(1, {
      message: 'Please enter a folder name',
    })
    .max(255, {
      message: 'Folder name must be less than 255 characters',
    })
    .regex(/^[a-zA-Z0-9_\-.]+$/, {
      message:
        'Folder name can only contain letters (a-z, A-Z), numbers (0-9), underscores (_), hyphens (-), and periods (.).',
    })
    .refine((name) => !name.startsWith('.'), {
      message: 'Folder name cannot start with a period.',
    })
    .refine((name) => !name.endsWith('.'), {
      message: 'Folder name cannot end with a period.',
    })
    .refine((name) => !name.includes('..'), {
      message: 'Folder name cannot contain consecutive periods.',
    }),
  description: z.optional(
    z.string({
      required_error: 'Please enter a description',
    })
  ),
  file: z
    .any()
    .nullable() // Allow null values (no file selected)
    .optional() // Make the field optional
    .refine(
      (files) => !files || !files[0] || files[0].size <= 10 * 1024 * 1024, // Check size only if a file is selected
      { message: 'Image size must be less than 10MB.' }
    )
    .refine(
      (files) =>
        !files || !files[0] || ['image/jpeg', 'image/jpg', 'image/png'].includes(files[0].type), // Check type only if a file is selected
      { message: 'Only JPG, JPEG, and PNG files are allowed.' }
    ),
});
const CollectionUpload = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const createCollection = useCollectionCreate();
  const form = useForm<z.infer<typeof schema>>({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      folderName: '',
    },

    validate: zodResolver(schema),
  });

  form.watch('name', ({ value }) => {
    let sanitizedName = value.replace(/\s+/g, '_'); // Replace spaces with underscores
    sanitizedName = sanitizedName.replace(/[^a-zA-Z0-9_\-\\.]/g, ''); // Remove invalid chars
    form.setFieldValue('folderName', sanitizedName);
  });
  function handleSubmit(values: z.infer<typeof schema>) {
    const sumbitForm = new FormData();
    sumbitForm.append('name', values.name);
    sumbitForm.append('folderName', values.folderName);
    sumbitForm.append('description', values.description || '');
    if (values.file) {
      sumbitForm.append('file', values.file);
    }
    createCollection.mutate(sumbitForm, {
      onSuccess: async (data) => {
        form.reset();
        close();
        customNotification('success', {
          title: 'Success',
          message: data.message,
        });
      },
    });
  }
  return (
    <>
      <Modal opened={opened} onClose={close} title="Create new collection" centered pos="relative">
        <LoadingOverlay visible={createCollection.isPending} />
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            key={form.key('name')}
            {...form.getInputProps('name')}
            withAsterisk
            label="Collection name"
            placeholder="new collection"
          />
          <TextInput
            key={form.key('folderName')}
            {...form.getInputProps('folderName')}
            withAsterisk
            label="Collection folder name"
            placeholder="new_collection"
          />
          <Textarea
            key={form.key('description')}
            {...form.getInputProps('description')}
            label="Collection description"
            placeholder="Collection description"
          />
          <FileInput
            label="Collection image"
            placeholder="Collection image"
            key={form.key('file')}
            {...form.getInputProps('file')}
            accept="image/png,image/jpeg"
          />

          <Button fullWidth mt="lg" type="submit">
            Submit
          </Button>
        </form>
      </Modal>

      <ActionIcon
        variant="transparent"
        my="xl"
        radius="xl"
        aria-label="Add Collection"
        size="xl"
        onClick={open}
      >
        <PlusIcon style={{ width: '70%', height: '70%' }} />
      </ActionIcon>
    </>
  );
};

export default CollectionUpload;
