import { IonItem, IonLabel, IonList } from "@ionic/react";
import useReactQuery from "../hooks/use-react-query";

export default function SourcesList() {
  const sources = useReactQuery("sources").documents;

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
