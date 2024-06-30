import { useEffect } from "react";
import { useFonts } from "expo-font";
import { NotoSerifSC_400Regular } from "@expo-google-fonts/noto-serif-sc";
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold
} from "@expo-google-fonts/inter";
import {
  AmaticSC_400Regular,
  AmaticSC_700Bold
} from "@expo-google-fonts/amatic-sc";
import {
  Poppins_400Regular,
  Poppins_600SemiBold
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BiometricsProvider from "@/components/day10/BiometricsProvider";
import { Drawer } from "expo-router/drawer";

import { vexo } from "vexo-analytics";

// You may want to wrap this with `if (!__DEV__) { ... }` to only run Vexo in production.
if (!__DEV__) {
  vexo(process.env.EXPO_PUBLIC_VEXO_API_KEY || "");
}

SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const [fontsLoaded, fontError] = useFonts({
    NotoSerif: NotoSerifSC_400Regular,
    Inter: Inter_400Regular,
    InterSemi: Inter_600SemiBold,
    InterBold: Inter_700Bold,
    Amatic: AmaticSC_400Regular,
    AmaticBold: AmaticSC_700Bold,
    Poppins: Poppins_400Regular,
    PoppinsSemiBold: Poppins_600SemiBold
  });

  useEffect(() => {
    console.log("error: ", fontError);
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <BiometricsProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerTitle: "ExpoDev" }} />
          </Stack>
        </SafeAreaProvider>
        {/* <Drawer screenOptions={{}}>
          <Drawer.Screen
            name="index"
            options={{ drawerLabel: "Home", title: "ExpoDev"  }}
          />
        </Drawer> */}
      </GestureHandlerRootView>
    </BiometricsProvider>
  );
}
