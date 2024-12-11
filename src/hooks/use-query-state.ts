import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tableNames } from "../utils/constants";
import { supabase } from "../utils/supabase";
import { useIonLoading } from "@ionic/react";
import { TablesInsert } from "../types/database";

type TablesInsertQueryKeys = TablesInsert<keyof typeof tableNames>;
type IMutationFn = { data: TablesInsertQueryKeys; callback?: () => void };

async function queryFunction(tableName: keyof typeof tableNames) {
  const { data, error } = await supabase.from(tableName).select("*");
  if (error) throw new Error(error.message);
  return data;
}

async function mutationFunction(
  tableName: keyof typeof tableNames,
  data: TablesInsertQueryKeys
) {
  const { error } = await supabase.from(tableName).insert(data);
  if (error) throw new Error(error.message);
}

export default function useQueryState(queryKey: keyof typeof tableNames) {
  const [presentLoader, dismissLoader] = useIonLoading();
  const queryClient = useQueryClient();

  const tableName = tableNames[queryKey];

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
