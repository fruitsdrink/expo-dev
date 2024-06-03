import { useAuth } from "@/providers/day19/AuthProvider";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Redirect href={"/day19/watermelondb"} />;
  }
  return <Stack />;
}
