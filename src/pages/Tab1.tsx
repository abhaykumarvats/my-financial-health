import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Health } from "../components/Health";

export default function Tab1() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Health</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Health />
      </IonContent>
    </IonPage>
  );
}
