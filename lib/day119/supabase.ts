import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_DAY119_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_DAY119_KEY;
// export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Post {
  id: string;
  image: string;
  image_url: string;
  caption: string;
  media_type: string;
  user: User;
}

interface User {
  id: string;
  avatar_url: string;
  image_url: string;
  username: string;
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});
