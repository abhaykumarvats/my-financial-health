import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonLoading,
} from "@ionic/react";
import { Immutable } from "immer";
import { addCircleOutline, closeOutline } from "ionicons/icons";
import { useImmer } from "use-immer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tableNames } from "../utils/constants";
import { supabase } from "../utils/supabase";
import { Tables } from "../types/database";

type INewAccounts = Immutable<
  Array<Partial<Tables<"insurance_accounts"> & { _id: string }>>
>;

async function getInsuranceAccounts() {
  const { error, data } = await supabase
    .from(tableNames.insurance_accounts)
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

async function setInsuranceAccounts(data: Array<Tables<"insurance_accounts">>) {
  const { error } = await supabase
    .from(tableNames.insurance_accounts)
    .insert(data);

  if (error) {
    throw new Error(error.message);
  }
}

export default function InsuranceAccounts() {
  const queryClient = useQueryClient();
  const [presentLoader, dismissLoader] = useIonLoading();
  const [presentAlert] = useIonAlert();
  const [newAccounts, setNewAccounts] = useImmer<INewAccounts>([]);

  const { data: accounts = [] } = useQuery({
    queryKey: [tableNames.insurance_accounts],
    queryFn: getInsuranceAccounts,
  });

  const { mutate } = useMutation({
    mutationFn: setInsuranceAccounts,
    onSuccess: () => {
      setNewAccounts([]);

      queryClient.invalidateQueries({
        queryKey: [tableNames.insurance_accounts],
      });
    },
    onError: (error) => {
      presentAlert({
        header: "Error",
        message: error.message,
        buttons: ["OK"],
      });
    },
    onSettled: () => dismissLoader(),
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton defaultHref="/settings" />
          </IonButtons>
          <IonTitle>Insurance Accounts</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {newAccounts.length ? (
          <h2 className="ion-margin-horizontal">New Accounts</h2>
        ) : null}

        {newAccounts.map((item, index) => (
          <IonList inset key={item._id}>
            <IonItem>
              <IonSelect
                label="Insurance Type"
                placeholder="Select"
                interface="action-sheet"
                onIonChange={(e) =>
                  setNewAccounts((draft) => {
                    draft[index].insurance_type = e.detail.value;
                  })
                }
              >
                <IonSelectOption value="term">Term Insurance</IonSelectOption>
                <IonSelectOption value="health">
                  Health Insurance
                </IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonInput
                type="text"
                placeholder="Insurance Name"
                value={item.insurance_name}
                onIonInput={(e) => {
                  setNewAccounts((draft) => {
                    draft[index].insurance_name = e.target.value as string;
                  });
                }}
              />
            </IonItem>

            <IonItem>
              <IonInput
                type="number"
                inputMode="decimal"
                placeholder="Insurance Premium"
                value={(item.insurance_premium as number) / 100}
                onIonInput={(e) => {
                  setNewAccounts((draft) => {
                    draft[index].insurance_premium =
                      Number(e.target.value) * 100;
                  });
                }}
              />
            </IonItem>

            <IonItem>
              <IonSelect
                label="Premium Frequency"
                placeholder="Select"
                interface="action-sheet"
                onIonChange={(e) =>
                  setNewAccounts((draft) => {
                    draft[index].premium_frequency = e.detail.value;
                  })
                }
              >
                <IonSelectOption value="monthly">Monthly</IonSelectOption>
                <IonSelectOption value="yearly">Yearly</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonInput
                type="number"
                inputMode="decimal"
                placeholder="Insurance Cover"
                value={(item.insurance_cover as number) / 100}
                onIonInput={(e) => {
                  setNewAccounts((draft) => {
                    draft[index].insurance_cover = Number(e.target.value) * 100;
                  });
                }}
              />
            </IonItem>

            <IonItem
              button
              detail={false}
              onClick={() =>
                setNewAccounts((draft) => {
                  draft.splice(index, 1);
                })
              }
            >
              <IonLabel color="danger">Remove this account</IonLabel>
              <IonIcon slot="end" color="danger" icon={closeOutline} />
            </IonItem>
          </IonList>
        ))}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
          }}
          className="ion-margin-horizontal"
        >
          <h2>Added Accounts</h2>
          <IonButton
            fill="clear"
            onClick={() =>
              setNewAccounts((draft) => {
                draft.push({ _id: crypto.randomUUID() });
              })
            }
          >
            <IonIcon slot="icon-only" icon={addCircleOutline} />
          </IonButton>
        </div>

        <IonNote
          style={{ display: "block", fontSize: "small" }}
          className="ion-margin-horizontal"
          color="medium"
        >
          Add as many accounts as you want by clicking +, then click Save.
        </IonNote>

        {!accounts.length && (
          <IonList inset>
            <IonItem>
              <IonNote>No accounts added</IonNote>
            </IonItem>
          </IonList>
        )}

        {accounts.length ? (
          <IonList inset>
            {accounts.map(({ id, insurance_name, insurance_cover }) => (
              <IonItem key={id}>
                <IonLabel>{insurance_name}</IonLabel>
                <IonNote>{(insurance_cover / 100).toFixed(2)}</IonNote>
              </IonItem>
            ))}
          </IonList>
        ) : null}
      </IonContent>

      <IonFooter className="ion-padding">
        <IonButton
          disabled={!newAccounts.length}
          expand="block"
          onClick={() => {
            presentLoader({ message: "Saving..." });
            mutate(
              newAccounts.map(({ _id, ...item }) => ({ ...item })) as Array<
                Tables<"insurance_accounts">
              >
            );
          }}
        >
          Save
        </IonButton>
      </IonFooter>
    </IonPage>
  );
}
