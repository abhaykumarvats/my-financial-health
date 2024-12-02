import { IonItem, IonLabel, IonList } from "@ionic/react";
import PageComponent from "../components/page.component";

export default function () {
  return (
    <PageComponent title="Profile">
      <IonList inset>
        <IonItem routerLink="/profile/income">
          <IonLabel>Income</IonLabel>
        </IonItem>
      </IonList>

      <IonList inset>
        <IonItem>
          <IonLabel>Term Insurance</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Health Insurance</IonLabel>
        </IonItem>
      </IonList>

      <IonList inset>
        <IonItem>
          <IonLabel>Savings</IonLabel>
        </IonItem>
      </IonList>
    </PageComponent>
  );
}
