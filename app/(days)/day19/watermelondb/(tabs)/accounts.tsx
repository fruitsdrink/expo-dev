import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function AccountScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Accounts"
        }}
      />
      <View>
        <Text>Account</Text>
      </View>
    </>
  );
}
