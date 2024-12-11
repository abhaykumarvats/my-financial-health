import {
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
  useIonModal,
} from "@ionic/react";
import { add, settingsOutline } from "ionicons/icons";
import useQueryState from "../hooks/use-query-state";
import { Tables } from "../types/database";
import CreateTransactionPage, {
  ICreateTransactionPage,
} from "./create-transaction";

export default function HomePage() {
  // Preload data
  const categories = useQueryState("categories").data as Array<
    Tables<"categories">
  >;

  const transactions = useQueryState("transactions").data as Array<
    Tables<"transactions">
  >;

  const [presentCreateTransactionModal, dismissCreateTransactionModal] =
    useIonModal(CreateTransactionPage, {
      dismissModal: () => dismissCreateTransactionModal(),
    } as ICreateTransactionPage);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/settings">
              <IonIcon icon={settingsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonListHeader>
          <IonLabel>Ledger</IonLabel>
          <IonButton onClick={() => presentCreateTransactionModal()}>
            <IonIcon slot="start" icon={add} /> Add Transaction
          </IonButton>
        </IonListHeader>

        {!transactions.length ? (
          <IonNote className="ion-margin-horizontal">
            No transactions found
          </IonNote>
        ) : (
          <IonList inset>
            {transactions.map(({ id, category_id, amount }) => (
              <>
                <IonItem key={id}>
                  <IonLabel>
                    {categories.find((item) => item.id === category_id)?.name}
                  </IonLabel>
                  <IonNote>{(amount / 100).toFixed(2)}</IonNote>
                </IonItem>
              </>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
}
