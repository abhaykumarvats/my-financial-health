import { IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { add } from "ionicons/icons";
import React from "react";

export default function AddButton({
  children,
  onClick,
}: React.PropsWithChildren<{ onClick: () => void }>) {
  return (
    <IonList inset>
      <IonItem button detail={false} onClick={onClick}>
        <IonIcon aria-hidden slot="start" icon={add} color="primary" />
        <IonLabel color="primary">{children}</IonLabel>
      </IonItem>
    </IonList>
  );
}
