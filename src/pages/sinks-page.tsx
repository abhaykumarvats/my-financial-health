import AddButton from "../components/add-button";
import Page from "../components/page";
import useQueryState from "../hooks/use-query-state";
import { IonItem, IonLabel, IonList, useIonAlert } from "@ionic/react";
import { Tables } from "../utils/types/database";

export default function SinksPage() {
  const [presentAlert] = useIonAlert();
  const data = useQueryState("categories").data as Array<Tables<"categories">>;
  const createCategory = useQueryState("categories").create;

  const categories = data.filter((item) => item.type === "expense");

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

              createCategory({ type: "expense", name });
            },
          })
        }
      >
        Add Expense Sink
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
