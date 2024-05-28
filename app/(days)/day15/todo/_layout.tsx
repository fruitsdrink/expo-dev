import TasksContextProvider from "@/components/day15/TasksContextProvider";
import { Slot, Stack } from "expo-router";

export default function _layou() {
  return (
    <TasksContextProvider>
      <Stack.Screen options={{ headerShown: false }} />
      <Stack />
    </TasksContextProvider>
  );
}
