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
import { useEffect, useState } from "react";
import { Preferences } from "@capacitor/preferences";

const initialState = {
  monthlyIncome: "",
  termInsurancePremium: "",
  healthInsurancePremium: "",
  currentSavings: "",
};

export default function Tab3() {
  const [values, setValues] = useState(initialState);
  const [isSuccessToastOpen, setIsSuccessToastOpen] = useState(false);
  const [isErrorToastOpen, setIsErrorToastOpen] = useState(false);

  useEffect(() => {
    async function getSavedValues() {
      const values = (await Preferences.get({ key: "values" })).value;

      if (!values) {
        return;
      }

      const parsedValues = JSON.parse(values);
      setValues(parsedValues);
    }

    getSavedValues();
  }, []);

  function onFieldChange(e: Event, field: keyof typeof initialState) {
    const value = (e.target as HTMLIonInputElement).value as string;
    const filteredValue = value.replace(/\D/g, "");
    setValues({ ...values, [field]: filteredValue });
  }

  async function onSave() {
    if (values.monthlyIncome.length <= 0) {
      setIsErrorToastOpen(true);
      return;
    }

    await Preferences.set({ key: "values", value: JSON.stringify(values) });
    setIsSuccessToastOpen(true);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Me</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonListHeader>Monthly Income*</IonListHeader>
        <IonList inset>
          <IonItem style={{ paddingBottom: "8px" }}>
            <IonInput
              inputMode="numeric"
              placeholder="Enter in digits (e.g. 32000)"
              helperText="*Required. Your take-home monthly income, after taxes."
              value={values.monthlyIncome}
              onIonInput={(e) => onFieldChange(e, "monthlyIncome")}
              clearInput
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
              onIonInput={(e) => onFieldChange(e, "termInsurancePremium")}
              clearInput
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
              onIonInput={(e) => onFieldChange(e, "healthInsurancePremium")}
              clearInput
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
              onIonInput={(e) => onFieldChange(e, "currentSavings")}
              clearInput
            ></IonInput>
          </IonItem>
        </IonList>

        <IonButton className="ion-padding" expand="block" onClick={onSave}>
          Save
        </IonButton>

        <IonToast
          isOpen={isErrorToastOpen}
          header="Please fill monthly income."
          duration={3000}
          position="top"
          color="danger"
          onDidDismiss={() => setIsErrorToastOpen(false)}
        ></IonToast>

        <IonToast
          isOpen={isSuccessToastOpen}
          header="Saved. Go to Health tab."
          duration={3000}
          position="top"
          color="dark"
          onDidDismiss={() => setIsSuccessToastOpen(false)}
        ></IonToast>
      </IonContent>
    </IonPage>
  );
}
