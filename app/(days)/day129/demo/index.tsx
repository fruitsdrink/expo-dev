import { Dimensions, StyleSheet, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { HomeProps } from "./constants";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const HomeScreen = ({ navigation }: HomeProps) => {
  return (
    <>
      <StatusBar hidden />
      <SafeAreaView style={styles.container}></SafeAreaView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
