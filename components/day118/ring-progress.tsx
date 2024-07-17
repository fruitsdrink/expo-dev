import { color } from "d3";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import Svg, { Circle, CircleProps } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Props = {
  radius?: number;
  strokeWidth?: number;
  progress: number;
};
export const RingProgress: React.FC<Props> = ({
  radius = 100,
  strokeWidth = 20,
  progress
}) => {
  const innerRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * innerRadius;

  const fill = useSharedValue(0);

  useEffect(() => {
    fill.value = withTiming(progress, { duration: 1500 });
  }, [progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDasharray: [circumference * fill.value, circumference]
  }));

  const circleDefulatProps: CircleProps = {
    r: innerRadius,
    cx: radius,
    cy: radius,
    fill: "transparent",
    strokeWidth: strokeWidth,
    stroke: "#ee0f55"
  };

  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
        alignSelf: "center"
      }}
    >
      <Svg>
        <Circle {...circleDefulatProps} opacity={0.2} />
        <AnimatedCircle
          animatedProps={animatedProps}
          r={innerRadius}
          {...circleDefulatProps}
          strokeLinecap="round"
          origin={`${radius}, ${radius}`}
          rotation={-90}
        />
      </Svg>
      <AntDesign
        name="arrowright"
        size={strokeWidth * 0.8}
        color={"#111"}
        style={{
          position: "absolute",
          alignSelf: "center",
          top: strokeWidth * 0.1
        }}
      />
    </View>
  );
};
