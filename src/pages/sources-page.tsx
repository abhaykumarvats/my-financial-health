import { IonItem, IonLabel, IonList, useIonAlert } from "@ionic/react";
import Page from "../components/page";
import useQueryState from "../hooks/use-query-state";
import AddButton from "../components/add-button";

export default function SourcesPage() {
  const [presentAlert] = useIonAlert();
  const { documents: sources, createDocument } = useQueryState("sources");

  return (
    <Page title="Income Sources">
      <AddButton
        onClick={() =>
          presentAlert({
            header: "Add Income Source",
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
        Add Income Source
      </AddButton>

      <IonList inset>
        {sources.map(({ name }) => (
          <IonItem key={name}>
            <IonLabel>{name}</IonLabel>
          </IonItem>
        ))}
      </IonList>
    </Page>
  );
}
