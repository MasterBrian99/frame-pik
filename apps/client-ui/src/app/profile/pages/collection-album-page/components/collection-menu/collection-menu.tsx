import { useEffect } from 'react';
import { Ellipsis, Pen } from 'lucide-react';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { Button, LoadingOverlay, Menu, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { useCollectionByIdCurrentUser, useCollectionUpdate } from '@/services/hooks/use-collection';
import customNotification from '@/shared/notifications';

interface Props {
  id: number;
}
const updateSchema = z.object({
  id: z.number(),
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

  description: z.optional(
    z.string({
      required_error: 'Please enter a description',
    })
  ),
});
const CollectionMenu = ({ id }: Props) => {
  const collectionItem = useCollectionByIdCurrentUser(String(id), {
    enabled: !!id,
    queryKey: ['collection', 'current-user', String(id)],
  });
  const updateForm = useForm<z.infer<typeof updateSchema>>({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      description: '',
      id,
    },

    validate: zodResolver(updateSchema),
  });
  useEffect(() => {
    if (collectionItem.data && collectionItem.data.data && collectionItem.isSuccess) {
      updateForm.setFieldValue('name', collectionItem.data.data.name);
      updateForm.setFieldValue('description', collectionItem.data.data.description);
    }
  }, [collectionItem.data]);

  const updateCollection = useCollectionUpdate();
  function handleUpdateSubmit(values: z.infer<typeof updateSchema>) {
    updateCollection.mutate(
      {
        ...values,
        description: values.description || '',
      },
      {
        onSuccess: async (data) => {
          updateForm.reset();
          modals.closeAll();
          customNotification('success', {
            title: 'Success',
            message: data.message,
          });
          await collectionItem.refetch();
        },
      }
    );
  }
  const openUpdateModal = () =>
    modals.open({
      id: 'update-collection-modal',
      title: 'Update collection details',
      pos: 'relative',
      children: (
        <>
          <LoadingOverlay visible={updateCollection.isPending} />

          <form onSubmit={updateForm.onSubmit(handleUpdateSubmit)}>
            <TextInput
              key={updateForm.key('name')}
              {...updateForm.getInputProps('name')}
              withAsterisk
              label="Collection name"
              placeholder="new collection"
            />
            <Textarea
              key={updateForm.key('description')}
              {...updateForm.getInputProps('description')}
              label="Collection description"
              placeholder="Collection description"
            />
            <Button fullWidth mt="lg" type="submit">
              Submit
            </Button>
          </form>
        </>
      ),
    });

  return (
    <Menu>
      <Menu.Target>
        <Ellipsis />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Collection Options</Menu.Label>
        <Menu.Item onClick={openUpdateModal} leftSection={<Pen size={14} />}>
          Edit
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default CollectionMenu;
