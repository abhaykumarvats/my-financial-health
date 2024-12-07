import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonModal,
} from "@ionic/react";
import { settingsOutline } from "ionicons/icons";
import SettingsPage, { ISettingsPage } from "./settings-page";
import useQueryState from "../hooks/use-query-state";
import { useRef } from "react";

export default function HomePage() {
  const [presentSettingsModal, dismissSettingsModal] = useIonModal(
    SettingsPage,
    { dismissModal: () => dismissSettingsModal() } as ISettingsPage
  );

  const pageRef = useRef(null);

  useQueryState("categories");

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

      <IonContent></IonContent>
    </IonPage>
  );
}
