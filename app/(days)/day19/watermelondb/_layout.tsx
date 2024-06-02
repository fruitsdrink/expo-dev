import { Stack, Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function WatermelondbLayout() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="account-tree" size={size} color={color} />
            )
          }}
        />
        <Tabs.Screen
          name="accounts"
          options={{
            title: "Accounts",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons
                name="account-balance-wallet"
                size={size}
                color={color}
              />
            )
          }}
        />
      </Tabs>
    </>
  );
}
