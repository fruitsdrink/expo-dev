import {
  Animated,
  ColorValue,
  Dimensions,
  Easing,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const animationEndY = SCREEN_HEIGHT * 0.7;
const negativeEndY = animationEndY * -1;

function getRandomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function getRandomColor() {
  return `rgb(${getRandomNumber(100, 400)},${getRandomNumber(
    10,
    200
  )}, ${getRandomNumber(200, 244)})`;
}

type HeartPorps = {
  color?: ColorValue;
  style?: StyleProp<ViewStyle>;
};
const Heart: React.FC<HeartPorps> = ({ style, color }) => {
  return (
    <View style={[styles.heart, style]}>
      <AntDesign name="heart" size={48} color={color} />
    </View>
  );
};

type HeartContainerProps = {
  style: StyleProp<ViewStyle>;
  color: ColorValue;
  onCompleted: () => void;
};
const HeartContainer: React.FC<HeartContainerProps> = ({
  style,
  color,
  onCompleted
}) => {
  const position = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(position, {
      toValue: negativeEndY,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false
    }).start(() => {
      onCompleted();
    });
  }, []);

  const yAnimation = position.interpolate({
    inputRange: [negativeEndY, 0],
    outputRange: [animationEndY, 0]
  });

  const xAnimation = yAnimation.interpolate({
    inputRange: [
      0,
      animationEndY / 6,
      animationEndY / 3,
      animationEndY / 2,
      animationEndY
    ],
    outputRange: [0, 25, 15, 0, 10]
  });

  const rotate = yAnimation.interpolate({
    inputRange: [
      0,
      animationEndY / 6,
      animationEndY / 3,
      animationEndY / 2,
      animationEndY
    ],
    outputRange: ["0deg", "-5deg", "0deg", "5deg", "0deg"]
  });

  const scale = yAnimation.interpolate({
    inputRange: [0, 15, 30],
    outputRange: [0, 1.4, 1],
    extrapolate: "clamp"
  });

  const opacity = yAnimation.interpolate({
    inputRange: [0, animationEndY],
    outputRange: [1, 0]
  });

  const rStyle: StyleProp<ViewStyle> = {
    opacity,
    transform: [
      { translateY: position },
      { scale },
      { translateX: xAnimation },
      { rotate }
    ]
  };

  return (
    <Animated.View style={[styles.heartContainer, rStyle, style]}>
      <Heart color={color} />
    </Animated.View>
  );
};

export default function DemoScreen() {
  const [hearts, setHearts] = React.useState<
    { id: number; right: number; color: ColorValue }[]
  >([]);

  const addHeart = () => {
    setHearts((prev) => {
      return [
        ...prev,
        {
          id: new Date().getTime(),
          right: getRandomNumber(20, 150),
          color: getRandomColor()
        }
      ];
    });
  };

  const removeHeart = (id: number) => {
    setHearts((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.container}>
          {hearts.map((item) => {
            return (
              <HeartContainer
                key={item.id}
                style={{ right: item.right }}
                color={item.color}
                onCompleted={() => {
                  removeHeart(item.id);
                }}
              />
            );
          })}
        </View>
        <TouchableOpacity style={styles.addButton} onPress={addHeart}>
          <AntDesign name="plus" size={24} color={"#fff"} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  addButton: {
    backgroundColor: "#378ad9",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 32,
    left: 32
  },
  heartContainer: {
    position: "absolute",
    bottom: 30,
    backgroundColor: "transparent"
  },
  heart: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  }
});
