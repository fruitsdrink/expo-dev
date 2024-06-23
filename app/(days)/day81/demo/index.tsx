import { Dimensions, StyleSheet, Text, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { text } from "blessed";
import Animated, {
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler
} from "react-native-gesture-handler";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const arr = new Array(25).fill("").map((_, i) => i);
const COL = 5;
const MARGIN = 8;
const PADDING = 16;
const SIZE = SCREEN_WIDTH / COL - MARGIN;

const getPosition = (index: number) => {
  "worklet";
  return {
    x: (index % COL) * SIZE,
    y: Math.floor(index / COL) * SIZE
  };
};

const getOrder = (x: number, y: number) => {
  "worklet";

  const row = Math.round(y / SIZE);
  const col = Math.round(x / SIZE);
  return row * COL + col;
};

interface BoxProps {
  count: number;
}
const Box: React.FC<BoxProps> = ({ count }) => {
  const backgroundColor = count % 2 === 0 ? "#6e48eb" : "#c0a946";
  return (
    <View style={[boxStyles.contianer, { backgroundColor }]}>
      <Text style={boxStyles.text}>{count}</Text>
    </View>
  );
};

const boxStyles = StyleSheet.create({
  contianer: {
    width: SIZE - MARGIN,
    height: SIZE - MARGIN,
    margin: MARGIN,
    borderRadius: 8,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#cde9e4"
  }
});

interface DraggableProps {
  children: React.ReactNode;
  positions: SharedValue<object>;
  id: number;
}
const Draggable: React.FC<DraggableProps> = ({ children, positions, id }) => {
  const position = getPosition(positions.value[id]);
  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);
  const context = useSharedValue({ x: 0, y: 0 });
  const isActive = useSharedValue(false);

  useAnimatedReaction(
    () => positions.value[id],
    (newOrder) => {
      const newPosition = getPosition(newOrder);
      translateX.value = withTiming(newPosition.x);
      translateY.value = withTiming(newPosition.y);
    }
  );

  const pan = Gesture.Pan()
    .onStart(() => {
      context.value = { x: translateX.value, y: translateY.value };
      isActive.value = true;
    })
    .onUpdate((ev) => {
      translateX.value = ev.translationX + context.value.x;
      translateY.value = ev.translationY + context.value.y;

      const oldOrder = positions.value[id];
      const newOrder = getOrder(translateX.value, translateY.value);

      if (oldOrder !== newOrder) {
        // 查询新位置的id
        const idToSwap = Object.keys(positions.value).find(
          (key) => positions.value[key] === newOrder
        );
        if (idToSwap) {
          const newPositions = JSON.parse(JSON.stringify(positions.value));
          newPositions[id] = newOrder;
          newPositions[idToSwap] = oldOrder;
          positions.value = newPositions;
        }
      }
    })
    .onEnd(() => {
      const destination = getPosition(positions.value[id]);
      translateX.value = withTiming(destination.x);
      translateY.value = withTiming(destination.y);
    })
    .onFinalize(() => {
      isActive.value = false;
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      margin: MARGIN * 2,
      zIndex: isActive.value ? 1000 : 1,
      transform: [
        { scale: isActive.value ? 1.1 : 1 },
        { translateX: translateX.value },
        { translateY: translateY.value }
      ]
    } as const;
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={rStyle}>{children}</Animated.View>
    </GestureDetector>
  );
};

export default function DemoScreen() {
  const positions = useSharedValue(
    Object.assign({}, ...arr.map((item) => ({ [item]: item })))
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaProvider style={styles.container}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaView style={styles.container}>
            <StatusBar hidden />
            <View style={styles.wrapper}>
              {arr.map((i) => (
                <Draggable key={i} positions={positions} id={i}>
                  <Box count={i} />
                </Draggable>
              ))}
            </View>
          </SafeAreaView>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333"
  },
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: PADDING
  }
});
