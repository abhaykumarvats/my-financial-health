import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonModal,
} from "@ionic/react";
import AddButton from "../components/add-button";
import Page from "../components/page";
import useQueryState from "../hooks/use-query-state";

export default function LedgerPage() {
  const [present, dismiss] = useIonModal(Modal, {
    dismiss: () => dismiss(),
  } as IModal);

  const { documents: sources } = useQueryState("sources");
  const { documents: sinks } = useQueryState("sinks");

  return (
    <Page title="Ledger">
      <AddButton onClick={present}>Create New Entry</AddButton>
    </Page>
  );
}

type IModal = { dismiss: () => void };

function Modal({ dismiss }: IModal) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={dismiss}>Cancel</IonButton>
          </IonButtons>

          <IonTitle>Create New Entry</IonTitle>

          <IonButtons slot="end">
            <IonButton strong onClick={dismiss}>
              Confirm
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding"></IonContent>
    </IonPage>
  );
}
