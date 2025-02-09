import { useMutation } from '@tanstack/react-query';
import { createCollection } from '../api/collection';

export function useCollectionCreate() {
  return useMutation({
    mutationFn: createCollection,
  });
}
