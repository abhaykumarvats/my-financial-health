import { IonItem, IonLabel, IonList } from "@ionic/react";
import Page from "../components/page";

export default function ProfilePage() {
  return (
    <Page title="Profile">
      <IonList inset>
        <IonItem routerLink="/profile/sources">
          <IonLabel>Income Sources</IonLabel>
        </IonItem>
        <IonItem routerLink="/profile/sinks">
          <IonLabel>Expense Sinks</IonLabel>
        </IonItem>
      </IonList>
    </Page>
  );
}
