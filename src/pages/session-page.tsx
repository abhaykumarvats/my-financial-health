import { zodResolver } from "@hookform/resolvers/zod";
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonInput,
  IonInputPasswordToggle,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonToast,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useId, useState } from "react";
import { supabase } from "../utils/supabase";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  confirm_password: z.string().optional(),
});

export default function SessionPage() {
  const {
    formState: { errors },
    setValue,
    setError,
    handleSubmit,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [presentLoader, dismissLoader] = useIonLoading();
  const [presentToast] = useIonToast();

  const [mode, setMode] = useState<"register" | "login">("login");
  const formId = useId();

  async function register(
    email: string,
    password: string,
    confirm_password?: string
  ) {
    if (password !== confirm_password) {
      setError("confirm_password", {
        type: "custom",
        message: "Passwords don't match",
      });

      return;
    }

    presentLoader({ message: "Registering..." });

    const { data, error } = await supabase.auth.signUp({ email, password });

    dismissLoader();

    if (error) {
      presentToast({
        message: error.message,
        position: "top",
        color: "danger",
        duration: 5000,
      });

      return;
    }

    if (data.user) {
      presentToast({
        header: "Registration Successful",
        message: "Please check your email for verification link.",
        position: "top",
        color: "dark",
        duration: 5000,
      });
    }
  }

  async function login(email: string, password: string) {
    presentLoader({ message: "Logging in..." });

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    dismissLoader();

    if (error) {
      presentToast({
        message: error.message,
        position: "top",
        color: "danger",
        duration: 5000,
      });
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Financial Health</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding-vertical">
        <form
          id={formId}
          onSubmit={handleSubmit((values: z.infer<typeof formSchema>) => {
            const { email, password, confirm_password } = values;

            if (mode === "login") {
              login(email, password);
            } else if (mode === "register") {
              register(email, password, confirm_password);
            }
          })}
        >
          <div className="ion-margin-horizontal">
            <IonSegment value={mode}>
              <IonSegmentButton value="login" onClick={() => setMode("login")}>
                <IonLabel>Login</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton
                value="register"
                onClick={() => setMode("register")}
              >
                <IonLabel>Register</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </div>

          <IonList inset>
            <IonItem color={errors.email && "danger"}>
              <IonInput
                type="email"
                placeholder="Email"
                onIonChange={(e) => setValue("email", e.target.value as string)}
              />
            </IonItem>

            <IonItem color={errors.password && "danger"}>
              <IonInput
                type="password"
                placeholder="Password"
                onIonChange={(e) =>
                  setValue("password", e.target.value as string)
                }
              >
                <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
              </IonInput>
            </IonItem>

            {mode === "register" && (
              <IonItem color={errors.confirm_password && "danger"}>
                <IonInput
                  type="password"
                  placeholder="Confirm Password"
                  onIonChange={(e) =>
                    setValue("confirm_password", e.target.value as string)
                  }
                >
                  <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                </IonInput>
              </IonItem>
            )}
          </IonList>

          {errors.confirm_password?.type === "custom" && (
            <IonNote className="ion-margin-horizontal" color="danger">
              {errors.confirm_password.message}
            </IonNote>
          )}
        </form>
      </IonContent>

      <IonFooter className="ion-padding">
        <IonButton form={formId} type="submit" expand="block">
          {mode === "login" ? "Login" : "Register"}
        </IonButton>
      </IonFooter>
    </IonPage>
  );
}
