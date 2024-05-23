import {
  Button,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { NewTaskInput, TaskListItem } from "@/components";
import { useHeaderHeight } from "@react-navigation/elements";

export type Task = {
  id: number;
  title: string;
  isFinished: boolean;
};

const dummyTasks: Task[] = [
  {
    id: 1,
    title: "Setup Day15 structure",
    isFinished: true,
  },
  {
    id: 2,
    title: "Render a list of tasks",
    isFinished: false,
  },
  {
    id: 3,
    title: "Add a new task",
    isFinished: false,
  },
  {
    id: 4,
    title: "Change the status of a task",
    isFinished: false,
  },
  {
    id: 5,
    title: "Separate in 2 tabs: todo, and complete",
    isFinished: false,
  },
];

export default function TodoScreen() {
  const [tasks, setTasks] = useState<Task[]>(dummyTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [tab, setTab] = useState<"all" | "todo" | "finished">("all");
  const headerHeight = useHeaderHeight();

  const filteredTasks = tasks.filter((task) => {
    if (tab === "todo" && task.isFinished) {
      return false;
    }

    if (tab === "finished" && !task.isFinished) {
      return false;
    }

    if (!searchQuery) {
      return true;
    }

    return task.title.toLowerCase().includes(searchQuery.toLowerCase().trim());
  });

  const onItemPress = (id: number) => {
    const newTasks = [...tasks];
    const task = newTasks.find((task) => task.id === id);
    if (task) {
      task.isFinished = !task.isFinished;
    }
    setTasks(newTasks);
  };

  const onDelete = (id: number) => {
    const newTasks = [...tasks];
    const index = newTasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      newTasks.splice(index, 1);
    }
    setTasks(newTasks);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerBackTitleVisible: false,
          headerSearchBarOptions: {
            hideWhenScrolling: true,
            cancelButtonText: "取消",
            autoCapitalize: "none",
            onChangeText: (e) => setSearchQuery(e.nativeEvent.text),
          },
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
              marginTop: 40,
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
              gap: 10,
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TaskListItem
                key={item.id}
                task={item}
                onItemPress={() => onItemPress(item.id)}
                onDelete={() => {
                  onDelete(item.id);
                }}
              />
            )}
            ListFooterComponent={() => (
              <NewTaskInput
                onAdd={(newTask) => {
                  setTasks([
                    ...tasks,
                    {
                      id: new Date().getTime(),
                      title: newTask,
                      isFinished: false,
                    },
                  ]);
                }}
              />
            )}
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
    padding: 10,
  },
  taskCointainer: {
    padding: 5,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  taskTitle: {
    flex: 1,
  },
});
