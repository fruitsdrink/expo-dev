import { Stack as ExpoStack } from "expo-router";
import { Easing, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { enableScreens } from "react-native-screens";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import HomeScreen from "./index";
import DetailScreen from "./detail";
import { RootStackParamList } from "./types";
enableScreens();

const Stack = createSharedElementStackNavigator<RootStackParamList>();

const DemoLayout = () => {
  return (
    <>
      <ExpoStack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer independent={true}>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Home"
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="Detail"
              component={DetailScreen}
              options={{
                gestureEnabled: false,
                transitionSpec: {
                  open: {
                    animation: "timing",
                    config: { duration: 500, easing: Easing.inOut(Easing.ease) }
                  },
                  close: {
                    animation: "timing",
                    config: { duration: 500, easing: Easing.inOut(Easing.ease) }
                  }
                },
                cardStyleInterpolator: ({ current: { progress } }) => {
                  return {
                    cardStyle: {
                      opacity: progress
                    }
                  };
                }
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

export default DemoLayout;
