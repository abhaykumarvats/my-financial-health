import { IonAlert, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { useState } from "react";
import { addCircleOutline } from "ionicons/icons";

export default function AddSink() {
  const [showAlert, setShowAlert] = useState(false);
  const [sinks, setSinks] = useState<string[]>([]);

  return (
    <>
      <IonList inset>
        <IonItem button detail={false} onClick={() => setShowAlert(true)}>
          <IonIcon
            aria-hidden
            slot="start"
            icon={addCircleOutline}
            color="primary"
          />
          <IonLabel color="primary">Add Expense Sink</IonLabel>
        </IonItem>
      </IonList>

      {sinks.length > 0 && (
        <IonList inset>
          {sinks.map((name) => (
            <IonItem key={name}>
              <IonLabel>{name}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      )}

      <IonAlert
        isOpen={showAlert}
        header="Add Expense Sink"
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

          const newSinks = [...sinks, name];
          setSinks(newSinks);
        }}
      />
    </>
  );
}
