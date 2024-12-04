import { IonAlert, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { useState } from "react";
import { add } from "ionicons/icons";
import useReactQuery from "../hooks/use-react-query";

export default function AddSource() {
  const { createDocument } = useReactQuery("sources");
  const [showAlert, setShowAlert] = useState(false);

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

          const name = detail.data.values.name as string;
          if (detail.role !== "confirm" || !name.length) {
            return;
          }

          createDocument({ name });
        }}
      />
    </>
  );
}
