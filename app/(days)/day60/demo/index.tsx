import { Dimensions, SafeAreaView, StyleSheet, Text } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import React, { useRef, useState } from "react";
import { faker } from "@faker-js/faker";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  ScrollView
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import { FontAwesome6 } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

type Task = {
  title: string;
  index: number;
};

const TASKS = [...Array(10).keys()].map((index) => ({
  index,
  title: faker.lorem.sentence()
}));

const BACKGROUND_COLOR = "#fafbff";
const LIST_ITEM_HEIGHT = 70;
// 平移阈值
// 当平移超过这个值时，任务会被删除
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

// interface ListItemProps
//   extends Pick<PanGestureHandlerProps, "simultaneousHandlers"> {
//   task: Task;
//   onDismiss?: (task: Task) => void;
// }
interface ListItemProps {
  task: Task;
  simultaneousHandlers: React.RefObject<ScrollView>;
  onDismiss?: (task: Task) => void;
}

const ListItem: React.FC<ListItemProps> = ({
  task,
  simultaneousHandlers,
  onDismiss
}) => {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);

  const pan = Gesture.Pan()
    .onUpdate((ev) => {
      translateX.value = ev.translationX;
    })
    .onEnd(() => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished && onDismiss) {
            runOnJS(onDismiss)(task);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    })
    .simultaneousWithExternalGesture(simultaneousHandlers);

  const rStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      transform: [{ translateX: translateX.value }]
    };
  });

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0
    );

    return { opacity };
  });

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value
    };
  });

  return (
    <Animated.View style={[listItemStyle.taskContainer, rTaskContainerStyle]}>
      <Animated.View style={[listItemStyle.iconContainer, rIconContainerStyle]}>
        <FontAwesome6
          name="trash-alt"
          size={LIST_ITEM_HEIGHT * 0.4}
          color="red"
        />
      </Animated.View>
      <GestureDetector gesture={pan}>
        <Animated.View style={[listItemStyle.task, rStyle]}>
          <Text style={listItemStyle.taskTitle}>{task.title}</Text>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

const listItemStyle = StyleSheet.create({
  taskContainer: {
    width: "100%",
    alignItems: "center"
  },
  task: {
    width: "90%",
    // height: LIST_ITEM_HEIGHT,
    backgroundColor: "white",
    justifyContent: "center",
    paddingLeft: 20,
    shadowOpacity: 0.04,
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 4
  },
  taskTitle: {
    fontSize: 16
  },
  iconContainer: {
    position: "absolute",
    right: "10%",
    width: LIST_ITEM_HEIGHT,
    height: LIST_ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default function DemoScreen() {
  const [tasks, setTasks] = useState(TASKS);
  const scrollRef = useRef(null);

  const onDismiss = (task: Task) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.index !== task.index));
  };
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <GestureHandlerRootView>
        <SafeAreaView style={styles.container}>
          <StatusBar hidden />
          <Text style={styles.title}>Tasks</Text>
          <ScrollView
            ref={scrollRef}
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
          >
            {tasks.map((task) => {
              return (
                <ListItem
                  key={task.index}
                  task={task}
                  onDismiss={onDismiss}
                  simultaneousHandlers={scrollRef}
                />
              );
            })}
          </ScrollView>
        </SafeAreaView>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR
  },
  title: {
    fontSize: 60,
    marginVertical: 20,
    paddingLeft: "5%"
  }
});
