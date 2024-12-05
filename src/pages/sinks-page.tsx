import AddButton from "../components/add-button";
import Page from "../components/page";
import useQueryState from "../hooks/use-query-state";
import { IonItem, IonLabel, IonList, useIonAlert } from "@ionic/react";

export default function SinksPage() {
  const [presentAlert] = useIonAlert();
  const { documents: sinks, createDocument } = useQueryState("sinks");

  return (
    <Page title="Expense Sinks">
      <AddButton
        onClick={() =>
          presentAlert({
            header: "Add Expense Sink",
            inputs: [{ type: "text", name: "name", placeholder: "Name*" }],
            buttons: [
              { text: "Cancel", role: "cancel" },
              { text: "Add", role: "confirm" },
            ],
            onDidDismiss: ({ detail }) => {
              const name = detail.data.values.name as string;

              if (detail.role !== "confirm" || !name.length) {
                return;
              }

              createDocument({ name });
            },
          })
        }
      >
        Add Expense Sink
      </AddButton>

      <IonList inset>
        {sinks.map(({ name }) => (
          <IonItem key={name}>
            <IonLabel>{name}</IonLabel>
          </IonItem>
        ))}
      </IonList>
    </Page>
  );
}
