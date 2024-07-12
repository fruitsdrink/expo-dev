import {
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// import image from "@/assets/images/day110/logo.png";

// const IMAGE = Image.resolveAssetSource(image).uri;

export default function DemoScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 justify-center align-middle bg-slate-700">
        <StatusBar hidden />
        <View className="logo_wrapper">
          <Image
            source={require("@/assets/images/day110/logo.png")}
            className="m-auto mb-[40] w-20 h-20"
          />
        </View>
        <View className="form_container">
          <View className="input_container w-[90vw] m-auto">
            <TextInput
              placeholder="Username, email address or mobile number"
              className="p-5 mb-3 w-full rounded-lg border bg-slate-500 border-zinc-300"
            />
            <TextInput
              placeholder="Password"
              secureTextEntry
              className="p-5 mb-10 w-full rounded-lg border bg-slate-500 border-zinc-300"
            />
            <TouchableOpacity className="p-4 bg-blue-500 rounded-full border-none">
              <Text className="text-center text-white">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="form_footer"></View>
      </SafeAreaView>
    </>
  );
}
