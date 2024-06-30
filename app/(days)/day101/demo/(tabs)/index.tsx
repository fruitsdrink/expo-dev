import { StyleSheet, Text, View } from "react-native";

export default function MoviesPage() {
  return (
    <View style={styels.container}>
      <Text>index</Text>
    </View>
  );
}

const styels = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  }
});
