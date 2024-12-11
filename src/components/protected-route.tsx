import { Route, RouteComponentProps, RouteProps } from "react-router";
import { IonContent, IonPage, IonSpinner } from "@ionic/react";
import { useImmer } from "use-immer";
import { AuthSession } from "@supabase/supabase-js";
import { useEffect } from "react";
import { supabase } from "../utils/supabase";
import SessionPage from "../pages/session-page";

type IProtectedRoute = RouteProps & {
  component: React.FC<RouteComponentProps>;
};

type IAuthState = {
  session: AuthSession | null;
  loading: boolean;
};

export default function ProtectedRoute({
  component: Component,
  ...restProps
}: IProtectedRoute) {
  const [authState, setAuthState] = useImmer<IAuthState>({
    session: null,
    loading: true,
  });

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthState((draft) => {
        draft.session = session;
        draft.loading = false;
      });
    });

    // Listen for auth changes
    const subscription = supabase.auth.onAuthStateChange((_, session) => {
      setAuthState((draft) => {
        draft.session = session;
        draft.loading = false;
      });
    }).data.subscription;

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
        authState.session ? <Component {...props} /> : <SessionPage />
      }
    />
  );
}
