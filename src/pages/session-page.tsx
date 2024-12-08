import { zodResolver } from "@hookform/resolvers/zod";
import {
  IonButton,
  IonContent,
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
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import useSession from "../hooks/use-session";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  confirm_password: z.string().optional(),
});

export default function LoginPage() {
  const {
    formState: { errors },
    setValue,
    setError,
    handleSubmit,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const router = useIonRouter();
  const [presentLoader, dismissLoader] = useIonLoading();
  const [presentToast] = useIonToast();

  const { register, login } = useSession();

  const [mode, setMode] = useState<"register" | "login">("login");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Financial Health</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <form
          style={{
            height: "100%",
            flexDirection: "column",
            display: "flex",
            justifyContent: "center",
          }}
          onSubmit={handleSubmit(
            async ({
              email,
              password,
              confirm_password,
            }: z.infer<typeof formSchema>) => {
              if (mode === "login") {
                presentLoader({ message: "Logging in..." });

                const { data, error } = await login(email, password);

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

                if (data.session) {
                  router.push("/");
                }
              } else if (mode === "register") {
                if (password !== confirm_password) {
                  setError("confirm_password", {
                    type: "custom",
                    message: "Passwords don't match",
                  });

                  return;
                }

                presentLoader({ message: "Registering..." });

                const { data, error } = await register(email, password);

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
                  setMode("login");

                  presentToast({
                    header: "Registration Successful",
                    message: "Please check your email for verification link.",
                    position: "top",
                    color: "dark",
                    duration: 5000,
                  });
                }
              }
            }
          )}
        >
          <div className="ion-padding-horizontal">
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
                label="Email"
                placeholder="Required"
                onIonChange={(e) => setValue("email", e.target.value as string)}
              />
            </IonItem>

            <IonItem color={errors.password && "danger"}>
              <IonInput
                type="password"
                label="Password"
                placeholder="Required"
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
                  label="Confirm Password"
                  placeholder="Required"
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

          <IonButton className="ion-margin" type="submit" expand="block">
            {mode === "login" ? "Login" : "Register"}
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
}
