import { Stack, Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "black",
          tabBarShowLabel: false
        }}
      >
        <Tabs.Screen
          name="(tabs)/index"
          options={{
            headerTitle: "For you",
            title: "Home",
            tabBarIcon: ({ size, color }) => (
              <FontAwesome name="home" size={size} color={color} />
            )
          }}
        />
        <Tabs.Screen
          name="(tabs)/new"
          options={{
            headerTitle: "Create Post",
            title: "Create Post",
            tabBarIcon: ({ size, color }) => (
              <FontAwesome name="plus-square-o" size={size} color={color} />
            )
          }}
        />
        <Tabs.Screen
          name="(tabs)/profile"
          options={{
            headerTitle: "Profile",
            title: "Profile",
            tabBarIcon: ({ size, color }) => (
              <FontAwesome name="user" size={size} color={color} />
            )
          }}
        />
      </Tabs>
    </>
  );
}
