import { useContext } from "react";
import { ValuesContext } from "../contexts/data.context";
import {
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from "@ionic/react";
import { useValidations } from "../hooks/hooks";
import { heart, heartHalf } from "ionicons/icons";
import { Empty } from "./empty.component";

export function Health() {
  const { values, committed } = useContext(ValuesContext);

  const { alerts, okays } = useValidations(values);

  if (!committed) {
    return <Empty />;
  }

  return (
    <>
      {alerts.length > 0 && (
        <>
          <IonListHeader>Unhealthy</IonListHeader>
          <IonList inset>
            {alerts.map((alert) => (
              <IonItem key={alert}>
                <IonIcon
                  aria-hidden
                  slot="start"
                  icon={heartHalf}
                  color="danger"
                ></IonIcon>
                <IonLabel>{alert}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        </>
      )}

      {okays.length > 0 && (
        <>
          <IonListHeader>Healthy</IonListHeader>
          <IonList inset>
            {okays.map((okay) => (
              <IonItem key={okay}>
                <IonIcon
                  aria-hidden
                  slot="start"
                  icon={heart}
                  color="success"
                ></IonIcon>
                <IonLabel>{okay}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        </>
      )}
    </>
  );
}
