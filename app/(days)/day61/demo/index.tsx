import {
  type StyleProp,
  type ViewStyle,
  Dimensions,
  StyleSheet,
  View,
  Text
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import React, { useRef } from "react";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView
} from "react-native-gesture-handler";
import Animated, {
  measure,
  runOnJS,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

const WIDTH = 200;
const HEIGHT = 200;

interface RippleType {
  style: StyleProp<ViewStyle>;
  onTap?: () => void;
}
const Ripple: React.FC<React.PropsWithChildren<RippleType>> = ({
  style,
  onTap,
  children
}) => {
  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);
  const scale = useSharedValue(0);
  const width = useSharedValue(0);
  const height = useSharedValue(0);
  const opacity = useSharedValue(1);

  const aRef = useAnimatedRef<View>();

  const tap = Gesture.Tap()
    .onBegin((ev) => {
      centerX.value = ev.x;
      centerY.value = ev.y;

      const layout = measure(aRef);
      if (layout) {
        width.value = layout.width;
        height.value = layout.height;
      }

      opacity.value = 1;
      scale.value = 0;
      scale.value = withTiming(1, { duration: 1000 });
    })
    .onStart(() => {
      if (onTap) {
        runOnJS(onTap)();
      }
    })
    .onFinalize(() => {
      opacity.value = withTiming(0, { duration: 1000 });
    });

  // @ts-ignore
  const rStyle = useAnimatedStyle(() => {
    const circleRadius = Math.sqrt(width.value ** 2 + height.value ** 2);

    const translateX = centerX.value - circleRadius;
    const translateY = centerY.value - circleRadius;
    return {
      position: "absolute",
      left: 0,
      top: 0,
      width: circleRadius * 2,
      height: circleRadius * 2,
      borderRadius: circleRadius,
      backgroundColor: "rgba(0,0,0,0.2)",
      opacity: opacity.value,
      transform: [
        {
          scale: scale.value
        },
        {
          translateX
        },
        {
          translateY
        }
      ]
    };
  });

  return (
    <GestureHandlerRootView style={style}>
      <View ref={aRef}>
        <GestureDetector gesture={tap}>
          <Animated.View style={[style, { overflow: "hidden" }]}>
            <View>{children}</View>
            <Animated.View style={rStyle} />
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

export default function DemoScreen() {
  const onTap = () => {
    console.log("ontap", new Date().getTime());
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <Ripple style={styles.ripple} onTap={onTap}>
          <Text style={{ fontSize: 25 }}>Tap</Text>
        </Ripple>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  ripple: {
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: "white",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 20,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20
  }
});
