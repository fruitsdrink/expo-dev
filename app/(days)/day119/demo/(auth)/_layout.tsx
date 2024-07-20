import { useAuth } from "@/providers/day119/AuthProvider";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href={"/day119/demo/(tabs)"} />;
  }

  return (
    <>
      <Stack />
    </>
  );
}
