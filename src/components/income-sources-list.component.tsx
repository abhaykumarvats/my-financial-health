import { useQuery } from "@tanstack/react-query";
import { queries } from "../utils/query.utils";
import { db } from "../utils/api.utils";
import { collectionIds } from "../utils/constants.utils";
import { IonItem, IonLabel, IonList, IonSpinner } from "@ionic/react";

export default function () {
  const { data, isPending } = useQuery({
    queryKey: [queries.sources],
    queryFn: () => db.list(collectionIds.sources),
  });

  const sources = data?.documents ?? [];

  if (isPending) {
    return (
      <div className="ion-margin ion-text-center">
        <IonSpinner />
      </div>
    );
  }

  if (!sources.length) {
    return;
  }

  return (
    <IonList inset>
      {sources.map(({ name }) => (
        <IonItem key={name}>
          <IonLabel>{name}</IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
}
