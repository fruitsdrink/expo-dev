import { Stack } from "expo-router";
import { StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";
import { NewTaskInput } from "@/components/day19/NewTaskInput";
import { Task, database } from "@/components/day19/model";
import { withObservables } from "@nozbe/watermelondb/react";

const TaskItem = ({ task }: { task: Task }) => {
  return (
    <View>
      <Text>{task.title}</Text>
    </View>
  );
};

const enhance = withObservables(["task"], ({ task }) => ({
  task // shortcut syntax for `comment: comment.observe()`
}));

const EnhancedTaskItem = enhance(TaskItem);

export default function WatermelondbLayout() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const tasks = await database.get<Task>("tasks").query().fetch();

    // console.log("🚀 ~ fetchTasks ~ tasks:", tasks);
    setTasks(tasks);
  };
  return (
    <>
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: "WatermelonDB"
        }}
      />
      <View style={styles.container}>
        {tasks.map((task) => (
          // <TaskItem key={task.id} task={task} />
          <EnhancedTaskItem key={task.id} task={task} />
        ))}
        <NewTaskInput fetchTasks={fetchTasks} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
