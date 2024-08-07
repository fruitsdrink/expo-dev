import { Stack as ExpoStack } from "expo-router";
import { Easing, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { enableScreens } from "react-native-screens";
import HomeScreen from "./index";
import DetailScreen from "./detail";

enableScreens();

export type RootStackParamList = {
  Home: undefined;
  Detail:
    | {
        item: {
          key: string;
          location: string;
          numberOfDays: number;
          image: string;
          color: string;
        };
      }
    | undefined;
};

const Stack = createSharedElementStackNavigator<RootStackParamList>();

const options = {
  gestureEnabled: false,
  headerBackTitleVisible: false,
  transitionSpec: {
    open: {
      animation: "timing",
      config: { duration: 400, easing: Easing.inOut(Easing.ease) }
    },
    close: {
      animation: "timing",
      config: { duration: 400, easing: Easing.inOut(Easing.ease) }
    }
  },
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress
      }
    };
  }
} as const;

const DemoLayout = () => {
  return (
    <>
      <ExpoStack.Screen options={{ headerShown: false }} />

      <NavigationContainer independent={true}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: {
              backgroundColor: "transparent"
            }
          }}
          initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={options}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default DemoLayout;
