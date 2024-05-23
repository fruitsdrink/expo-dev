import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  onAdd: (newTask: string) => void;
}
export const NewTaskInput: React.FC<Props> = ({ onAdd }) => {
  const [newTask, setNewTask] = useState("");

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
            onAdd(newTask);
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
    alignItems: "center",
  },

  input: {
    color: "dimgray",
    flex: 1,
  },
});
