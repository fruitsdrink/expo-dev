import { Redirect, Stack, Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "@/providers/day119/AuthProvider";

export default function RootLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href={"/day119/demo/(auth)"} />;
  }

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
          name="index"
          options={{
            headerTitle: "For you",
            title: "Home",
            unmountOnBlur: true,
            tabBarIcon: ({ size, color }) => (
              <FontAwesome name="home" size={size} color={color} />
            )
          }}
        />
        <Tabs.Screen
          name="new"
          options={{
            headerTitle: "Create Post",
            title: "Create Post",
            tabBarIcon: ({ size, color }) => (
              <FontAwesome name="plus-square-o" size={size} color={color} />
            )
          }}
        />
        <Tabs.Screen
          name="profile"
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
