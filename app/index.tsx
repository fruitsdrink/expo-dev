import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, View } from "react-native";

import { DayListItem } from "@/components";

// const days = Array.from({ length: 6 }, (_, i) => i + 1);
// const days = [...Array(2)].map((_, i) => i + 1);
const days = [
  {
    day: 1,
    title: "Introduction",
  },
  {
    day: 2,
    title: "onboarding",
  },
  {
    day: 3,
    title: "markdown",
    link: "https://www.youtube.com/live/XKKh9jZ8QD4?si=2sXnu-satwi0b2R5",
  },
  {
    day: 4,
    title: "animate splash lottie",
    link: "https://www.youtube.com/live/Y_IaioaI2w0?si=Uh5ucSY9Ycxk2bSu",
  },
  {
    day: 5,
    title: "airbnb map & bottom sheet",
    link: "https://www.youtube.com/live/ijBG81t0tAo?si=q3uA9oplDRB7yA9p",
  },
];

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
