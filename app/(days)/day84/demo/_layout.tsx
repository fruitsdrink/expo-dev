import "react-native-gesture-handler";
import { Slot, Stack } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

export default function DemoLayout() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer>
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: "Home",
              headerTitle: "My Home",
              drawerIcon: ({ color, size }) => (
                <Ionicons name="home-outline" color={color} size={size} />
              )
            }}
          />
          <Drawer.Screen
            name="news"
            options={{
              drawerLabel: "News",
              headerTitle: "Newsfeed",
              drawerIcon: ({ color, size }) => (
                <Ionicons name="newspaper-outline" color={color} size={size} />
              )
            }}
          />
          <Drawer.Screen
            name="profile"
            options={{
              drawerLabel: "Profile",
              headerTitle: "My Profile",
              drawerIcon: ({ color, size }) => (
                <Ionicons name="person-outline" color={color} size={size} />
              )
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </>
  );
}
