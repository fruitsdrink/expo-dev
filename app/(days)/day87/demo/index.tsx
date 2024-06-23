import { Button, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type StackParamsList = {
  payment: undefined;
};
export default function DemoScreen() {
  // const navigation =
  //   useNavigation<NativeStackNavigationProp<StackParamsList, "payment">>();
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();

  return (
    <>
      <View style={styles.container}>
        <StatusBar hidden />
        <View>
          <Button
            title="go to payment"
            onPress={() => {
              navigation.navigate("payment");
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center"
  }
});
