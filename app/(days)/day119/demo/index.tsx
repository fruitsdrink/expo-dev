import { Redirect } from "expo-router";
import { View, Text } from "react-native";

export default function Home() {
  return <Redirect href={"/day119/demo/(auth)"} />;
}
