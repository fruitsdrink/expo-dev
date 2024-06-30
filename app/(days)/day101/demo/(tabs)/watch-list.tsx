import { StyleSheet, Text, View } from "react-native";

export default function WatchListPage() {
  return (
    <View style={styels.container}>
      <Text>Watch List</Text>
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
