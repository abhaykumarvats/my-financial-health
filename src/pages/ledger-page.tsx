import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonModal,
} from "@ionic/react";
import AddButton from "../components/add-button";
import Page from "../components/page";
import { useForm } from "react-hook-form";
import { useId } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useQueryState from "../hooks/use-query-state";
import { Tables } from "../utils/types/database";

const formSchema = z.object({
  category_id: z.number(),
  date: z.string(),
  type: z.enum(["income", "expense"]),
  expense_type: z.enum(["need", "want"]).optional(),
  recurring: z.boolean().optional(),
  recurring_frequency: z.enum(["monthly", "yearly"]).optional(),
  amount: z.coerce.number(),
  description: z.string().optional(),
});

type ICreateTransactionModal = { dismiss: () => void };
type IFormSchema = z.infer<typeof formSchema>;

export default function LedgerPage() {
  const [presentModal, dismissModal] = useIonModal(CreateTransactionModal, {
    dismiss: () => dismissModal(),
  } as ICreateTransactionModal);

  const transactions = useQueryState("transactions").data as Array<
    Tables<"transactions">
  >;

  return (
    <Page title="Ledger">
      <AddButton onClick={presentModal}>Create New Transaction</AddButton>
      {transactions.length > 0 && (
        <IonList inset>
          {transactions.map(({ id, type, amount }) => (
            <IonItem key={id}>
              <IonLabel>{type}</IonLabel>
              <IonNote>{(amount / 100).toFixed(2)}</IonNote>
            </IonItem>
          ))}
        </IonList>
      )}
    </Page>
  );
}

function CreateTransactionModal({ dismiss }: ICreateTransactionModal) {
  const {
    formState: { errors },
    watch,
    setValue,
    resetField,
    handleSubmit,
  } = useForm<IFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { date: new Date().toISOString() },
  });

  console.log({ errors });

  const formId = useId();

  const type = watch("type");
  const data = useQueryState("categories").data as Array<Tables<"categories">>;
  const categories = data.filter((item) => item.type === type);

  const createTransaction = useQueryState("transactions").create;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={dismiss}>Cancel</IonButton>
          </IonButtons>

          <IonTitle>New Transaction</IonTitle>

          <IonButtons slot="end">
            <IonButton strong type="submit" form={formId}>
              Create
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <form
          id={formId}
          onSubmit={handleSubmit((values: z.infer<typeof formSchema>) => {
            createTransaction({
              data: {
                ...values,
                amount: values.amount * 100,
              },
              callback: dismiss,
            });
          })}
        >
          <IonList inset>
            <IonDatetime
              preferWheel
              presentation="date"
              value={watch("date")}
              onIonChange={(e) => setValue("date", e.target.value as string)}
            >
              <IonNote slot="title" color="dark">
                Transaction Date
              </IonNote>
            </IonDatetime>
          </IonList>

          <IonList inset>
            <IonItem>
              <IonSelect
                label="Transaction Type"
                interface="action-sheet"
                placeholder="Select"
                onIonChange={({ detail }) => {
                  setValue("type", detail.value);
                  resetField("expense_type");
                  resetField("category_id");
                }}
              >
                <IonSelectOption value="income">Income</IonSelectOption>
                <IonSelectOption value="expense">Expense</IonSelectOption>
              </IonSelect>
            </IonItem>

            {type === "expense" && (
              <IonItem>
                <IonSelect
                  label="Expense Type"
                  interface="action-sheet"
                  placeholder="Select"
                  onIonChange={({ detail }) =>
                    setValue("expense_type", detail.value)
                  }
                >
                  <IonSelectOption value="need">Need</IonSelectOption>
                  <IonSelectOption value="want">Want </IonSelectOption>
                </IonSelect>
              </IonItem>
            )}

            {type && (
              <IonItem>
                <IonSelect
                  label="Category"
                  interface="action-sheet"
                  placeholder="Select"
                  value={watch("category_id")}
                  onIonChange={({ detail }) =>
                    setValue("category_id", detail.value)
                  }
                >
                  {categories.map(({ id, name }) => (
                    <IonSelectOption key={id} value={id}>
                      {name}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            )}
          </IonList>

          <IonList inset>
            <IonItem>
              <IonToggle
                onIonChange={({ detail }) => {
                  setValue("recurring", detail.checked);
                  resetField("recurring_frequency");
                }}
              >
                Recurring Transaction
              </IonToggle>
            </IonItem>

            {watch("recurring") && (
              <IonItem>
                <IonSelect
                  label="Recurring Frequency"
                  interface="action-sheet"
                  placeholder="Select"
                  onIonChange={({ detail }) =>
                    setValue("recurring_frequency", detail.value)
                  }
                >
                  <IonSelectOption value="monthly">Monthly</IonSelectOption>
                  <IonSelectOption value="yearly">Yearly</IonSelectOption>
                </IonSelect>
              </IonItem>
            )}
          </IonList>

          <IonList inset>
            <IonItem>
              <IonInput
                type="number"
                label="Amount"
                placeholder="Required"
                inputMode="decimal"
                onIonInput={(e) => setValue("amount", e.target.value as number)}
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Description"
                placeholder="Optional"
                onIonInput={(e) =>
                  setValue("description", e.target.value as string)
                }
              />
            </IonItem>
          </IonList>
        </form>
      </IonContent>
    </IonPage>
  );
}
