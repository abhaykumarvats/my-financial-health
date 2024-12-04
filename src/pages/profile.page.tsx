import { IonItem, IonLabel, IonList } from "@ionic/react";
import PageComponent from "../components/page.component";

export default function () {
  return (
    <PageComponent title="Profile">
      <IonList inset>
        <IonItem routerLink="/profile/sources">
          <IonLabel>Income Sources</IonLabel>
        </IonItem>
        <IonItem routerLink="/profile/sinks">
          <IonLabel>Expense Sinks</IonLabel>
        </IonItem>
      </IonList>
    </PageComponent>
  );
}
