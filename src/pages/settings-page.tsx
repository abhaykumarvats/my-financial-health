import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonLoading,
} from "@ionic/react";
import { add } from "ionicons/icons";
import useQueryState from "../hooks/use-query-state";
import { Tables } from "../types/database";
import { supabase } from "../utils/supabase";

export default function SettingsPage() {
  const [presentAlert] = useIonAlert();
  const [presentLoader, dismissLoader] = useIonLoading();

  const createCategory = useQueryState("categories").create;
  const categories = useQueryState("categories").data as Array<
    Tables<"categories">
  >;

  const incomeCategories = categories.filter((item) => item.type === "income");
  const expenseCategories = categories.filter(
    (item) => item.type === "expense"
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>

          <IonTitle>Settings</IonTitle>

          <IonButtons slot="end">
            <IonButton
              color="danger"
              onClick={async () => {
                presentLoader({ message: "Logging out..." });

                const { error } = await supabase.auth.signOut();

                dismissLoader();

                if (error) {
                  presentAlert({ header: "Error", message: error.message });
                }
              }}
            >
              Logout
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList inset>
          <IonItem routerLink="/settings/savings-accounts">
            Savings Accounts
          </IonItem>
        </IonList>

        <IonListHeader>
          <IonLabel>Income Categories</IonLabel>
          <IonButton
            onClick={() =>
              presentAlert({
                header: "Add Income Category",
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

                  createCategory({ data: { type: "income", name } });
                },
              })
            }
          >
            <IonIcon slot="start" icon={add} />
            Add
          </IonButton>
        </IonListHeader>

        {!incomeCategories.length ? (
          <IonNote className="ion-margin">No income categories found</IonNote>
        ) : (
          <IonList inset>
            {incomeCategories.map(({ id, name }) => (
              <IonItem key={id}>
                <IonLabel>{name}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}

        <IonListHeader>
          <IonLabel>Expense Categories</IonLabel>
          <IonButton
            onClick={() =>
              presentAlert({
                header: "Add Expense Category",
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

                  createCategory({ data: { type: "expense", name } });
                },
              })
            }
          >
            <IonIcon slot="start" icon={add} />
            Add
          </IonButton>
        </IonListHeader>

        {!expenseCategories.length ? (
          <IonNote className="ion-margin">No expense categories found</IonNote>
        ) : (
          <IonList inset>
            {expenseCategories.map(({ id, name }) => (
              <IonItem key={id}>
                <IonLabel>{name}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
}
