import {
  Animated,
  ColorValue,
  Dimensions,
  Easing,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

type StarProps = {
  filled?: boolean;
  color?: ColorValue;
  size?: number;
};
const Star: React.FC<StarProps> = ({ filled, color, size }) => {
  const starSize = Math.max(0, size ?? 32);

  return (
    <FontAwesome
      name={filled ? "star" : "star-o"}
      size={starSize}
      color={color ?? "#6f3bd8"}
    />
  );
};

type Ratingprops = {
  ratingNum?: number;
  starNum?: number;
  starColor?: ColorValue;
  starSize?: number;
  gap: number;
  onRatingChange?: (rating: number) => void;
  onBeforeRating?: (rating: number) => boolean;
};
const Rating: React.FC<Ratingprops> = ({
  ratingNum,
  starNum,
  starColor,
  starSize,
  gap,
  onRatingChange,
  onBeforeRating
}) => {
  const [stars, setStars] = useState([]);
  const [numStars, setNumStars] = useState(starNum ?? 5);
  const [rating, setRating] = useState(ratingNum ?? 0);
  const animation = useRef(new Animated.Value(1)).current;

  const animate = () => {
    Animated.timing(animation, {
      toValue: 2,
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: true
    }).start(() => {
      animation.setValue(1);
    });
  };

  const scale = animation.interpolate({
    inputRange: [1, 1.5, 2],
    outputRange: [1, 1.4, 1]
  });

  const rotate = animation.interpolate({
    inputRange: [1, 1.25, 1.75, 2],
    outputRange: ["0deg", "-3deg", "3deg", "0deg"]
  });

  const opacity = animation.interpolate({
    inputRange: [1, 1.2, 2],
    outputRange: [1, 0.5, 1]
  });

  const rStyle: StyleProp<ViewStyle> = {
    opacity,
    transform: [{ scale }, { rotate }]
  };

  useEffect(() => {
    const stars = Array.from({ length: numStars }).map((_, index) => {
      return (
        <Pressable
          key={index}
          onPress={() => {
            if (rate(index + 1)) {
              animate();
            }
          }}
        >
          <Animated.View style={index <= rating - 1 ? rStyle : null}>
            <Star
              filled={index <= rating - 1 ? true : false}
              color={starColor}
              size={starSize}
            />
          </Animated.View>
        </Pressable>
      );
    });

    setStars(stars);
  }, [rating, numStars]);

  useEffect(() => {
    setRating(ratingNum);
    setNumStars(starNum);
  }, [ratingNum, starNum]);

  const rate = (star: number) => {
    star = Math.min(numStars, Math.max(1, star));
    if (onBeforeRating && !onBeforeRating(rating)) {
      return false;
    }
    setRating(star);
    onRatingChange?.(star);
    return true;
  };

  return <View style={{ flexDirection: "row", gap: gap ?? 0 }}>{stars}</View>;
};

export default function DemoScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <Rating
          ratingNum={1}
          starNum={6}
          starColor={"#6f3bd8"}
          starSize={32}
          gap={8}
          onRatingChange={(stars) => {
            console.log("stars", stars);
          }}
          onBeforeRating={(rating) => {
            console.log("rating", rating);
            return true;
          }}
        />
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
  }
});
