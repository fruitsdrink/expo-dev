import { Dimensions, StyleSheet, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { DetailProps, SPACING } from "./constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const DetailScreen = ({ navigation, route }: DetailProps) => {
  const { item } = route.params;

  return (
    <>
      <StatusBar hidden />
      <SafeAreaView style={styles.container}>
        <AntDesign
          name="close"
          size={28}
          color={"#333"}
          style={{
            padding: 12,
            position: "absolute",
            top: SPACING * 2,
            right: 0,
            zIndex: 2
          }}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
