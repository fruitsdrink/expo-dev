import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { Task, useTasks } from "./TasksContextProvider";

interface Props {
  task: Task;
  // onItemPress: () => void;
  // onDelete: () => void;
}

const AnimatedView = Animated.createAnimatedComponent(View);

const RightActions = ({
  progressAnimatedValue,
  dragAnimatedValue,
  id,
}: {
  progressAnimatedValue: Animated.AnimatedInterpolation<number>;
  dragAnimatedValue: Animated.AnimatedInterpolation<number>;
  id: number;
}) => {
  const { deleteTask } = useTasks();

  const animatedStyles = {
    transform: [
      {
        translateX: dragAnimatedValue.interpolate({
          inputRange: [-40, 0],
          outputRange: [0, 40],
          extrapolate: "clamp",
        }),
      },
    ],
  };
  return (
    <AnimatedView
      style={[
        {
          backgroundColor: "crimson",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 8,
        },
        animatedStyles,
      ]}
    >
      <MaterialCommunityIcons
        onPress={() => deleteTask(id)}
        name="delete"
        size={20}
        color="white"
      />
    </AnimatedView>
  );
};
export const TaskListItem: React.FC<Props> = ({ task }) => {
  const { setTaskFinished, deleteTask } = useTasks();

  return (
    <Swipeable
      renderRightActions={(progressAnimatedValue, dragAnimatedValue) => (
        <RightActions
          progressAnimatedValue={progressAnimatedValue}
          dragAnimatedValue={dragAnimatedValue}
          id={task.id}
        />
      )}
    >
      <Pressable
        style={styles.taskCointainer}
        onPress={() => setTaskFinished(task.id)}
      >
        <MaterialCommunityIcons
          name={
            task.isFinished
              ? "checkbox-marked-circle-outline"
              : "checkbox-blank-circle-outline"
          }
          size={24}
          color={task.isFinished ? "lightgray" : "dimgray"}
        />
        <Text
          style={[
            styles.taskTitle,
            {
              textDecorationLine: task.isFinished ? "line-through" : "none",
              color: task.isFinished ? "lightgray" : "dimgray",
            },
          ]}
        >
          {task.title}
        </Text>
      </Pressable>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
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
