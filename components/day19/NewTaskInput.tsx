import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Task, database } from "./model";

interface Props {
  fetchTasks: () => void;
}
export const NewTaskInput: React.FC<Props> = ({ fetchTasks }) => {
  const [newTask, setNewTask] = useState("");

  const addTask = async (newTask: string) => {
    await database.write(async () => {
      const task = await database.get<Task>("tasks").create((task) => {
        task.title = newTask;
        task.isFinished = false;
      });
      // console.log("🚀 ~ task ~ task:", task);
      fetchTasks();
    });
  };

  return (
    <View style={styles.taskCointainer}>
      <MaterialCommunityIcons
        name="checkbox-blank-circle-outline"
        size={24}
        color="dimgray"
      />
      <TextInput
        placeholder="new todo..."
        style={styles.input}
        value={newTask}
        autoCapitalize={"none"}
        onChangeText={(text) => {
          setNewTask(text);
        }}
        onEndEditing={() => {
          if (newTask) {
            addTask(newTask);
            setNewTask("");
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  taskCointainer: {
    padding: 5,
    flexDirection: "row",
    gap: 10,
    alignItems: "center"
  },

  input: {
    color: "dimgray",
    flex: 1
  }
});
