import { IonAlert, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { useState } from "react";
import { add } from "ionicons/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queries } from "../utils/query.utils";
import { db } from "../utils/api.utils";
import { collectionIds } from "../utils/constants.utils";
import { Document } from "../utils/types.utils";

export default function () {
  const [showAlert, setShowAlert] = useState(false);

  const queryClient = useQueryClient();

  const sourcesMutation = useMutation({
    mutationFn: (data: Document) => db.create(collectionIds.sources, data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [queries.sources] });
    },
  });

  return (
    <>
      <IonList inset>
        <IonItem button detail={false} onClick={() => setShowAlert(true)}>
          <IonIcon aria-hidden slot="start" icon={add} color="primary" />
          <IonLabel color="primary">Add Income Source</IonLabel>
        </IonItem>
      </IonList>

      <IonAlert
        isOpen={showAlert}
        header="Add Income Source"
        buttons={[
          { text: "Cancel", role: "cancel" },
          { text: "Add", role: "confirm" },
        ]}
        inputs={[
          { type: "text", name: "name", placeholder: "Name (required)" },
        ]}
        onDidDismiss={({ detail }) => {
          setShowAlert(false);

          if (!detail.data || detail.role !== "confirm") {
            return;
          }

          const name = detail.data.values.name as string;

          if (!name.length) {
            return;
          }

          const newSource = { name };

          sourcesMutation.mutate(newSource);
        }}
      />
    </>
  );
}
