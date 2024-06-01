import { Stack } from "expo-router";
import { Button, StyleSheet, View } from "react-native";
import { customEvent } from "vexo-analytics";

export default function AnalyticsScreen() {
  const handleCustomEvent = () => {
    customEvent("test_event", {
      test: "data",
      date: new Date().getTime()
    });
  };

  return (
    <>
      <Stack.Screen options={{ title: "Analytics" }} />
      <View style={styles.container}>
        <View>
          <Button title="自定义事件" onPress={handleCustomEvent} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
