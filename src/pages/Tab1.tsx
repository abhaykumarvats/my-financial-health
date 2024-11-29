import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Empty from "../components/Empty";
import { useEffect, useState } from "react";
import { Preferences } from "@capacitor/preferences";

export default function Tab1() {
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    async function checkEmptyState() {
      const values = (await Preferences.get({ key: "values" })).value;

      if (!values) {
        return;
      }

      setIsEmpty(false);
    }

    checkEmptyState();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Health</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>{/* isEmpty && */ <Empty />}</IonContent>
    </IonPage>
  );
}
