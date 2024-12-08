import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router";
import { supabase } from "../utils/supabase";
import { IonContent, IonPage, IonSpinner } from "@ionic/react";

type IProtectedRoute = RouteProps & {
  component: React.FC<RouteComponentProps>;
};

type IAuthState = {
  session: Session | null;
  loading: boolean;
};

export default function ProtectedRoute({
  component: Component,
  ...restProps
}: IProtectedRoute) {
  const [authState, setAuthState] = useState<IAuthState>({
    session: null,
    loading: true,
  });

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthState({ session, loading: false });
    });

    // Listen for auth changes
    const subscription = supabase.auth.onAuthStateChange((_, session) => {
      setAuthState({ session, loading: false });
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
          <IonSpinner slot="fixed" />
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
