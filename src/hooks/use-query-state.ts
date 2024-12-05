import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { collectionIds, queryKeys } from "../utils/constants";
import { IDocument } from "../utils/types";
import { db } from "../utils/appwrite";

export default function useQueryState(queryKey: keyof typeof queryKeys) {
  /* Query */
  const query = useQuery({
    queryKey: [queryKeys[queryKey]],
    queryFn: () => db.listDocuments(collectionIds[queryKey]),
  });

  const documents = query.data?.documents ?? [];

  /* Mutation */
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IDocument) =>
      db.createDocument(collectionIds[queryKey], data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys[queryKey]] });
    },
  });

  function createDocument(data: IDocument) {
    mutation.mutate(data);
  }

  return { documents, createDocument };
}
