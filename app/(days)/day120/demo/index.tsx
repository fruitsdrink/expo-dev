import { Dimensions, StyleSheet, Text, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import { rotate } from "react-native-redash";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

type CardProps = {
  index: number;
  progress: SharedValue<number>;
};
const Card: React.FC<CardProps> = ({ index, progress }) => {
  const rStyle = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [0, index * 25]);

    const translateY = interpolate(progress.value, [0, 1], [0, -index * 10]);

    const rotate = interpolate(
      progress.value,
      [0, 1],
      [-index * 10, index * 10]
    );

    return {
      transform: [
        {
          translateX: translateX
        },
        {
          rotate: `${rotate}deg`
        },
        {
          translateY: translateY
        }
      ]
    } as const;
  }, []);

  return (
    <Animated.View
      key={index}
      style={[
        styles.card,
        {
          zIndex: -index
        },
        rStyle
      ]}
    >
      <Text style={styles.text}>{index}</Text>
    </Animated.View>
  );
};

export default function DemoScreen() {
  const progress = useSharedValue(0);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View
        style={styles.container}
        onTouchCancel={() => {
          console.log("onTouchCancel");
        }}
        onTouchStart={() => {
          console.log("onTouchStart");
          progress.value = withTiming(1);
        }}
        onTouchEnd={() => {
          console.log("onTouchEnd");
          progress.value = withTiming(0);
        }}
      >
        <StatusBar hidden />
        {/* <View style={styles.card} /> */}
        {new Array(4).fill(null).map((_, index) => {
          return <Card key={index} index={index} progress={progress} />;
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3e3e3",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    width: 180,
    aspectRatio: 3 / 4,
    backgroundColor: "white",
    borderRadius: 12,
    borderCurve: "continuous",
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#b9b9b9",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 48,
    fontWeight: "semibold",
    color: "#333"
  }
});
