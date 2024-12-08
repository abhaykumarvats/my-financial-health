import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonNote,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import { useId } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useQueryState from "../hooks/use-query-state";
import { Tables } from "../utils/types/database";

export type ICreateTransactionPage = { dismissModal?: () => void };

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

export default function CreateTransactionPage({
  dismissModal,
}: ICreateTransactionPage) {
  const {
    formState: { errors },
    watch,
    setValue,
    setError,
    resetField,
    handleSubmit,
  } = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: { date: new Date().toISOString() },
  });

  const data = useQueryState("categories").data as Array<Tables<"categories">>;
  const createTransaction = useQueryState("transactions").create;

  const formId = useId();

  const type = watch("type");
  const categories = data.filter((item) => item.type === type);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={dismissModal}>Cancel</IonButton>
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
            let error = false;

            if (values.type === "expense" && !values.expense_type) {
              error = true;
              setError("expense_type", { type: "expense_type" });
            }

            if (values.recurring && !values.recurring_frequency) {
              error = true;
              setError("recurring_frequency", { type: "recurring_frequency" });
            }

            if (error) {
              return;
            }

            createTransaction({
              data: {
                ...values,
                amount: values.amount * 100,
              },
              callback: dismissModal,
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
            <IonItem color={errors.type && "danger"}>
              <IonSelect
                label="Transaction Type"
                interface="action-sheet"
                placeholder="Required"
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
              <IonItem color={errors.expense_type && "danger"}>
                <IonSelect
                  label="Expense Type"
                  interface="action-sheet"
                  placeholder="Required"
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
              <IonItem color={errors.category_id && "danger"}>
                <IonSelect
                  label="Category"
                  interface="action-sheet"
                  placeholder="Required"
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

            <IonItem color={errors.amount && "danger"}>
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
              <IonItem color={errors.recurring_frequency && "danger"}>
                <IonSelect
                  label="Recurring Frequency"
                  interface="action-sheet"
                  placeholder="Required"
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
        </form>
      </IonContent>
    </IonPage>
  );
}
