import { supabase } from "../utils/supabase";

export default function useSession() {
  async function register(email: string, password: string) {
    return await supabase.auth.signUp({ email, password });
  }

  async function login(email: string, password: string) {
    return await supabase.auth.signInWithPassword({ email, password });
  }

  async function logout() {
    return await supabase.auth.signOut();
  }

  return { register, login, logout };
}
