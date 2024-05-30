import {
  Button,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Text
} from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { NewTaskInput, TaskListItem, useTasksStore } from "@/components/day16";
import { useHeaderHeight } from "@react-navigation/elements";

export default function TodoScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tab, setTab] = useState<"all" | "todo" | "finished">("all");
  const headerHeight = useHeaderHeight();

  const numberOfCompletedTasks = useTasksStore().numberOfCompletedTasks();
  const numberOfTasks = useTasksStore().numberOfTasks();

  const getFilteredTasks = useTasksStore((state) => state.getFilteredTasks);

  const filteredTasks = getFilteredTasks(tab, searchQuery);

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerBackTitleVisible: false,
          headerRight: () => (
            <Text style={{ color: "dimgray" }}>
              {numberOfCompletedTasks} / {numberOfTasks}
            </Text>
          ),
          headerSearchBarOptions: {
            hideWhenScrolling: true,
            cancelButtonText: "取消",
            autoCapitalize: "none",
            onChangeText: (e) => setSearchQuery(e.nativeEvent.text)
          }
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={0}
      >
        <SafeAreaView
          edges={["bottom"]}
          style={[styles.container, { paddingTop: headerHeight }]}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 40
            }}
          >
            <Button title="All" onPress={() => setTab("all")} />
            <Button title="Todo" onPress={() => setTab("todo")} />
            <Button title="Finished" onPress={() => setTab("finished")} />
          </View>
          <FlatList
            data={filteredTasks}
            keyExtractor={(item) => `${item.id}`}
            contentContainerStyle={{
              gap: 10
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TaskListItem key={item.id} task={item} />
            )}
            ListFooterComponent={() => <NewTaskInput />}
          />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10
  },
  taskCointainer: {
    padding: 5,
    flexDirection: "row",
    gap: 10,
    alignItems: "center"
  },
  taskTitle: {
    flex: 1
  }
});
