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
import SettingsPage, { ISettingsPage } from "./settings-page";
import useQueryState from "../hooks/use-query-state";
import { useRef } from "react";
import { Tables } from "../utils/types/database";
import CreateTransactionPage, {
  ICreateTransactionPage,
} from "./create-transaction-page";

export default function HomePage() {
  // Preload data
  useQueryState("categories");

  const transactions = useQueryState("transactions").data as Array<
    Tables<"transactions">
  >;

  const [presentSettingsModal, dismissSettingsModal] = useIonModal(
    SettingsPage,
    { dismissModal: () => dismissSettingsModal() } as ISettingsPage
  );

  const [presentCreateTransactionModal, dismissCreateTransactionModal] =
    useIonModal(CreateTransactionPage, {
      dismissModal: () => dismissCreateTransactionModal(),
    } as ICreateTransactionPage);

  const pageRef = useRef(null);

  return (
    <IonPage ref={pageRef}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() =>
                presentSettingsModal({ presentingElement: pageRef.current! })
              }
            >
              <IonIcon icon={settingsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonListHeader>
          <IonLabel>Ledger</IonLabel>
          <IonButton
            onClick={() =>
              presentCreateTransactionModal({
                presentingElement: pageRef.current!,
              })
            }
          >
            <IonIcon slot="start" icon={add} /> Add Transaction
          </IonButton>
        </IonListHeader>

        {!transactions.length ? (
          <IonNote className="ion-margin-horizontal">
            No transactions found
          </IonNote>
        ) : (
          <IonList inset>
            {transactions.map(({ id, type, amount }) => (
              <IonItem key={id}>
                <IonLabel>{type}</IonLabel>
                <IonNote>{(amount / 100).toFixed(2)}</IonNote>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
}
