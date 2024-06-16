import { Dimensions, StyleSheet, View, Image, Text } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { useRef } from "react";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from "react-native-reanimated";
import index from "../../day13";

const { width, height } = Dimensions.get("window");
const SiZE = width * 0.7;

const WORDS = ["What's", "up", "mobile", "devs?"];

type PagePros = {
  index: number;
  title: string;
  translateX: SharedValue<number>;
};
const Page: React.FC<PagePros> = ({ index, title, translateX }) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP // 限制范围为0-1
    );

    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SiZE / 2, 0],
      Extrapolation.CLAMP // 限制范围为0-1
    );

    return {
      borderRadius,
      transform: [
        {
          scale
        }
      ]
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [
        {
          translateY
        }
      ]
    };
  });
  return (
    <View
      style={[
        pageStyle.pageContainer,
        {
          backgroundColor: `rgba(0,0,256, 0.${index + 2})`
        }
      ]}
    >
      <Animated.View style={[pageStyle.square, rStyle]}></Animated.View>
      <Animated.View style={[{ position: "absolute" }, rTextStyle]}>
        <Text style={pageStyle.text}>{title}</Text>
      </Animated.View>
    </View>
  );
};

const pageStyle = StyleSheet.create({
  pageContainer: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center"
  },
  square: {
    width: SiZE,
    height: SiZE,
    backgroundColor: "rgba(0,0,256, 0.4)"
  },
  text: {
    fontSize: 40,
    color: "white",
    textTransform: "uppercase",
    fontWeight: "700",
    textShadowColor: "#333",
    textShadowOffset: {
      width: 2,
      height: 2
    },
    textShadowRadius: 8
  }
});

export default function DemoScreen() {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((ev) => {
    translateX.value = ev.contentOffset.x;
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="auto" />
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={styles.container}
      >
        {WORDS.map((word, index) => {
          return (
            <Page
              key={index}
              title={word}
              index={index}
              translateX={translateX}
            />
          );
        })}
      </Animated.ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
