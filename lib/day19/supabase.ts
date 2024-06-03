import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rplshcrlbycotsxutkiv.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbHNoY3JsYnljb3RzeHV0a2l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczNzU0NjIsImV4cCI6MjAzMjk1MTQ2Mn0.NI4URUWa6zFoeS1yoemvkLfBbjCcVB0F3htHh7kqZgc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});
