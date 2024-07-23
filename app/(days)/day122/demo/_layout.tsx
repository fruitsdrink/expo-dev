import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./index";
import DetailScreen from "./detail";
import { StatusBar } from "react-native";
import { Stack as ExpoStack } from "expo-router";

const Stack = createNativeStackNavigator<{
  Home: undefined;
  Detail: { item: any } | undefined;
}>();

export default function DemoLayout() {
  return (
    <>
      <ExpoStack.Screen options={{ headerShown: false }} />
      <NavigationContainer independent={true}>
        <StatusBar hidden />
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
