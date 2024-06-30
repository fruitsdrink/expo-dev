import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import DripIcons from "@/assets/dripicons/dripIcons";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function DemoScreen() {
  const [loaded, error] = useFonts({
    DripIcons: require("@/assets/dripicons/dripicons-v2.ttf")
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <StatusBar hidden />
        {!loaded && <Text>Waiting for load font</Text>}
        {error && (
          <View>
            <Text>Error for load font</Text>
          </View>
        )}
        {loaded && (
          <FlatList
            numColumns={3}
            data={Object.keys(DripIcons.glyphMap).map((name) => ({
              key: name,
              name
            }))}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    marginVertical: 10
                  }}
                >
                  <DripIcons name={item.name as any} size={42} color={"#333"} />
                  <Text style={{ fontSize: 14 }}>{item.name}</Text>
                </View>
              );
            }}
          />
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
