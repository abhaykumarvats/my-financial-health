import { IonItem, IonLabel, IonList, useIonAlert } from "@ionic/react";
import Page from "../components/page";
import useQueryState from "../hooks/use-query-state";
import AddButton from "../components/add-button";
import { Tables } from "../utils/types/database";

export default function SourcesPage() {
  const [presentAlert] = useIonAlert();
  const data = useQueryState("categories").data as Array<Tables<"categories">>;
  const createCategory = useQueryState("categories").create;

  const categories = data.filter((item) => item.type === "income");

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

              createCategory({ type: "income", name });
            },
          })
        }
      >
        Add Income Source
      </AddButton>

      <IonList inset>
        {categories.map(({ name }) => (
          <IonItem key={name}>
            <IonLabel>{name}</IonLabel>
          </IonItem>
        ))}
      </IonList>
    </Page>
  );
}
