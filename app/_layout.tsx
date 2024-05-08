import { useEffect } from "react";
import { useFonts } from "expo-font";
import { NotoSerifSC_400Regular } from "@expo-google-fonts/noto-serif-sc";
import { Inter_400Regular } from "@expo-google-fonts/inter";
import {
  AmaticSC_400Regular,
  AmaticSC_700Bold,
} from "@expo-google-fonts/amatic-sc";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const [fontsLoaded, fontError] = useFonts({
    NotoSerif: NotoSerifSC_400Regular,
    Inter: Inter_400Regular,
    Amatic: AmaticSC_400Regular,
    AmaticBold: AmaticSC_700Bold,
    Poppins: Poppins_400Regular,
    PoppinsSemiBold: Poppins_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "ExpoDev" }} />
    </Stack>
  );
}
