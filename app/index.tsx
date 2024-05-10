import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, View } from "react-native";

import { DayListItem } from "@/components";

// const days = Array.from({ length: 6 }, (_, i) => i + 1);
const days = [...Array(2)].map((_, i) => i + 1);

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={days}
        contentContainerStyle={styles.content}
        columnWrapperStyle={styles.column}
        numColumns={2}
        renderItem={({ item }) => <DayListItem day={item} />}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    gap: 10,
    padding: 10,
  },
  column: {
    gap: 10,
  },
});
