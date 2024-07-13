import { View, Text, Button } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./home";
import LoginScreen from "./login";
import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../context/auth-context";

export default function DemoScreen() {
  return (
    <AuthProvider>
      <Stack.Screen options={{ headerShown: false }} />
      <Layout />
    </AuthProvider>
  );
}

const RNStack = createNativeStackNavigator();

const Layout = () => {
  const { authState, onLogout } = useAuth();

  if (authState.authenticated === null) {
    return null;
  }

  return (
    <NavigationContainer independent={true}>
      <RNStack.Navigator>
        {authState?.authenticated ? (
          <RNStack.Screen
            name="home"
            component={HomeScreen}
            options={{
              headerRight: () => <Button title="Logout" onPress={onLogout} />
            }}
          />
        ) : (
          <RNStack.Screen name="Login" component={LoginScreen} />
        )}
      </RNStack.Navigator>
    </NavigationContainer>
  );
};
