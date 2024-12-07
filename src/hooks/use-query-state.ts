import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../utils/constants";
import { supabase } from "../utils/supabase";
import { useIonLoading } from "@ionic/react";
import { TablesInsert } from "../utils/types/database";

type TablesInsertQueryKeys = TablesInsert<keyof typeof queryKeys>;
type IMutationFn = { data: TablesInsertQueryKeys; callback?: () => void };

async function queryFunction(tableName: keyof typeof queryKeys) {
  const { data, error } = await supabase.from(tableName).select("*");
  if (error) throw new Error(error.message);
  return data;
}

async function mutationFunction(
  tableName: keyof typeof queryKeys,
  data: TablesInsertQueryKeys
) {
  const { error } = await supabase.from(tableName).insert(data);
  if (error) throw new Error(error.message);
}

export default function useQueryState(queryKey: keyof typeof queryKeys) {
  const [presentLoader, dismissLoader] = useIonLoading();
  const queryClient = useQueryClient();

  const tableName = queryKeys[queryKey];

  /* Query */
  const { data = [] } = useQuery({
    queryKey: [tableName],
    queryFn: () => queryFunction(tableName),
  });

  /* Mutation */
  const mutation = useMutation({
    mutationFn: async ({ data, callback }: IMutationFn) => {
      presentLoader({ message: "Saving..." });
      await mutationFunction(tableName, data);
      dismissLoader();
      callback?.();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [tableName] }),
  });

  /* Custom */
  function create(params: IMutationFn) {
    mutation.mutate(params);
  }

  return { data, create };
}
