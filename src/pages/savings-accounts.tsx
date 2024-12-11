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
  IonListHeader,
  IonNote,
  IonPage,
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

type INewAccounts = Immutable<Array<Partial<Tables<"savings_accounts">>>>;

async function getSavingsAccounts() {
  const { error, data } = await supabase
    .from(tableNames.savings_accounts)
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

async function setSavingsAccounts(data: Array<Tables<"savings_accounts">>) {
  const { error } = await supabase
    .from(tableNames.savings_accounts)
    .insert(data);

  if (error) {
    throw new Error(error.message);
  }
}

export default function SavingsAccounts() {
  const queryClient = useQueryClient();
  const [presentLoader, dismissLoader] = useIonLoading();
  const [presentAlert] = useIonAlert();

  const { data: accounts = [] } = useQuery({
    queryKey: [tableNames.savings_accounts],
    queryFn: getSavingsAccounts,
  });

  const { mutate } = useMutation({
    mutationFn: setSavingsAccounts,
    onSuccess: () => {
      setNewAccounts([]);

      queryClient.invalidateQueries({
        queryKey: [tableNames.savings_accounts],
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

  const [newAccounts, setNewAccounts] = useImmer<INewAccounts>([]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton />
          </IonButtons>
          <IonTitle>Savings Accounts</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {newAccounts.length ? (
          <IonListHeader className="ion-margin-top">New Accounts</IonListHeader>
        ) : null}

        {newAccounts.map((item, index) => (
          <IonList inset key={index}>
            <IonItem>
              <IonInput
                type="text"
                placeholder="Account Name"
                value={item.account_name}
                onIonInput={(e) => {
                  setNewAccounts((draft) => {
                    draft[index].account_name = e.target.value as string;
                  });
                }}
              />
            </IonItem>

            <IonItem>
              <IonInput
                type="number"
                inputMode="decimal"
                placeholder="Account Balance"
                value={item.account_balance}
                onIonInput={(e) => {
                  setNewAccounts((draft) => {
                    draft[index].account_balance = e.target.value as number;
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

        <IonListHeader>
          <IonLabel>Added Accounts</IonLabel>

          <IonButton
            onClick={() =>
              setNewAccounts((draft) => {
                draft.push({ account_name: "", account_balance: NaN });
              })
            }
          >
            <IonIcon icon={addCircleOutline} />
          </IonButton>
        </IonListHeader>

        <IonNote
          style={{ display: "block" }}
          className="ion-margin-horizontal"
          color="medium"
        >
          <small>
            Add as many accounts as you want by clicking &quot;+&quot;, then
            click Save.
          </small>
        </IonNote>

        {!accounts.length && (
          <IonList inset>
            <IonItem>
              <IonNote>No saved accounts</IonNote>
            </IonItem>
          </IonList>
        )}

        {accounts.length ? (
          <IonList inset>
            {accounts.map(({ id, account_name, account_balance }) => (
              <IonItem key={id}>
                <IonLabel>{account_name}</IonLabel>
                <IonNote>{account_balance}</IonNote>
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
            mutate(newAccounts as Array<Tables<"savings_accounts">>);
          }}
        >
          Save
        </IonButton>
      </IonFooter>
    </IonPage>
  );
}
