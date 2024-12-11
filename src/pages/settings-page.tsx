import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonLoading,
} from "@ionic/react";
import { supabase } from "../utils/supabase";

export default function SettingsPage() {
  const [presentAlert] = useIonAlert();
  const [presentLoader, dismissLoader] = useIonLoading();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
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
        <h2 className="ion-margin-horizontal">Accounts</h2>
        <IonList inset>
          <IonItem routerLink="/settings/savings-accounts">
            Savings Accounts
          </IonItem>
          <IonItem routerLink="/settings/insurance-accounts">
            Insurance Accounts
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
}
