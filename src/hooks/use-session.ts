import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { AuthSession } from "@supabase/supabase-js";

type IAuthState = {
  session: AuthSession | null;
  loading: boolean;
};

export default function useSession() {
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

  return { authState };
}
