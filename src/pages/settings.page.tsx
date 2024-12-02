import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { useContext, useState } from "react";
import { Field, ValuesContext } from "../contexts/data.context";

export default function Settings() {
  const { values, updateValues, commitValues } = useContext(ValuesContext);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  function onInput(e: Event, field: Field) {
    const value = (e.target as HTMLIonInputElement).value as string;
    const filteredValue = value.replace(/\D/g, "");
    updateValues({ ...values, [field]: filteredValue });
  }

  async function onSave() {
    if (values.monthlyIncome.length <= 0) {
      setError(true);
      return;
    }

    await commitValues();
    setSuccess(true);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Settings</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonListHeader>Monthly Income*</IonListHeader>
        <IonList inset>
          <IonItem style={{ paddingBottom: "8px" }}>
            <IonInput
              inputMode="numeric"
              placeholder="Enter in digits (e.g. 32000)"
              helperText="*Required. Your take-home monthly income, after taxes."
              value={values.monthlyIncome}
              onIonInput={(e) => onInput(e, "monthlyIncome")}
            ></IonInput>
          </IonItem>
        </IonList>

        <IonListHeader>Term Insurance</IonListHeader>
        <IonList inset>
          <IonItem style={{ paddingBottom: "8px" }}>
            <IonInput
              inputMode="numeric"
              placeholder="Enter in digits (e.g. 32000)"
              helperText="Your monthly term insurance premium. Divide by 12 if you pay yearly. Leave empty if you don't have a term insurance."
              value={values.termInsurancePremium}
              onIonInput={(e) => onInput(e, "termInsurancePremium")}
            ></IonInput>
          </IonItem>
        </IonList>

        <IonListHeader>Health Insurance</IonListHeader>
        <IonList inset>
          <IonItem style={{ paddingBottom: "8px" }}>
            <IonInput
              inputMode="numeric"
              placeholder="Enter in digits (e.g. 32000)"
              helperText="Your monthly health insurance premium. Divide by 12 if you pay yearly. Leave empty if you don't have a health insurance."
              value={values.healthInsurancePremium}
              onIonInput={(e) => onInput(e, "healthInsurancePremium")}
            ></IonInput>
          </IonItem>
        </IonList>

        <IonListHeader>Current Savings</IonListHeader>
        <IonList inset>
          <IonItem style={{ paddingBottom: "8px" }}>
            <IonInput
              inputMode="numeric"
              placeholder="Enter in digits (e.g. 32000)"
              helperText="Your total cash savings. Includes your emergency fund. Leave empty if you don't have any savings."
              value={values.currentSavings}
              onIonInput={(e) => onInput(e, "currentSavings")}
            ></IonInput>
          </IonItem>
        </IonList>

        <IonButton className="ion-padding" expand="block" onClick={onSave}>
          Save
        </IonButton>

        <IonToast
          isOpen={error}
          header="Please fill monthly income."
          duration={3000}
          position="top"
          color="danger"
          onDidDismiss={() => setError(false)}
        ></IonToast>

        <IonToast
          isOpen={success}
          header="Saved. Go to Health tab."
          duration={3000}
          position="top"
          color="dark"
          onDidDismiss={() => setSuccess(false)}
        ></IonToast>
      </IonContent>
    </IonPage>
  );
}
