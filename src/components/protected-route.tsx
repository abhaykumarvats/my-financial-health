import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router";
import { IonContent, IonPage, IonSpinner } from "@ionic/react";
import useSession from "../hooks/use-session";

type IProtectedRoute = RouteProps & {
  component: React.FC<RouteComponentProps>;
};

export default function ProtectedRoute({
  component: Component,
  ...restProps
}: IProtectedRoute) {
  const { authState } = useSession();

  // Loading state
  if (authState.loading) {
    return (
      <IonPage>
        <IonContent>
          <div
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IonSpinner slot="fixed" />
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <Route
      {...restProps}
      render={(props) =>
        authState.session ? (
          <Component {...props} />
        ) : (
          <Redirect to="/session" />
        )
      }
    />
  );
}
