import {
  Dimensions,
  FlatList,
  ImageProps,
  StyleSheet,
  View,
  useWindowDimensions
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import React, { useRef } from "react";
import { Image } from "expo-image";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue
} from "react-native-reanimated";

const data = [
  require("@/assets/images/day68/00.jpg"),
  require("@/assets/images/day68/01.jpg"),
  require("@/assets/images/day68/02.jpg"),
  require("@/assets/images/day68/03.jpg"),
  require("@/assets/images/day68/04.jpg"),
  require("@/assets/images/day68/05.jpg"),
  require("@/assets/images/day68/06.jpg"),
  require("@/assets/images/day68/07.jpg"),
  require("@/assets/images/day68/08.jpg"),
  require("@/assets/images/day68/09.jpg")
];

const placeholder = require("@/assets/favicon.png");

interface CircularCarouselProps {
  data: ImageProps["source"][];
}
const CircularCarousel: React.FC<CircularCarouselProps> = ({ data }) => {
  const contentOffset = useSharedValue(0);

  return (
    <FlatList
      data={data}
      horizontal
      pagingEnabled
      snapToInterval={ListItemWidth}
      scrollEventThrottle={16} // 16ms => 60fps
      onScroll={(ev) => {
        // console.log(ev.nativeEvent.contentOffset.x);
        contentOffset.value = ev.nativeEvent.contentOffset.x;
      }}
      keyExtractor={(_, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      style={{ position: "absolute", bottom: 0, height: 300 }}
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        paddingRight: 3 * ListItemWidth
      }}
      ItemSeparatorComponent={() => {
        return <View style={{ width: 5 }}></View>;
      }}
      renderItem={({ item, index }) => {
        return (
          <CircularCarouselItem
            imageSrc={item}
            index={index}
            contentOffset={contentOffset}
          />
        );
      }}
    />
  );
};

const { width: windowWidth } = Dimensions.get("window");
const ListItemWidth = windowWidth / 4;

interface CircularCarouselItemProps {
  imageSrc: ImageProps["source"];
  index: number;
  contentOffset: SharedValue<number>;
}
const CircularCarouselItem: React.FC<CircularCarouselItemProps> = ({
  imageSrc,
  index,
  contentOffset
}) => {
  // @ts-ignore
  const rStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 2) * ListItemWidth,
      (index - 1) * ListItemWidth,
      index * ListItemWidth,
      (index + 1) * ListItemWidth,
      (index + 2) * ListItemWidth
    ];

    const translateYOutputRange = [
      0,
      -ListItemWidth / 3,
      -ListItemWidth / 2,
      -ListItemWidth / 3,
      0
    ];

    const translateY = interpolate(
      contentOffset.value,
      inputRange,
      translateYOutputRange,
      Extrapolation.CLAMP
    );

    const opacityOutputRange = [0.7, 0.9, 1, 0.9, 0.7];

    const opacity = interpolate(
      contentOffset.value,
      inputRange,
      opacityOutputRange,
      Extrapolation.CLAMP
    );

    const scaleOutputRange = [0.5, 0.8, 1, 0.8, 0.5];

    const scale = interpolate(
      contentOffset.value,
      inputRange,
      scaleOutputRange,
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [
        { translateY },
        { translateX: ListItemWidth / 2 + ListItemWidth },
        { scale }
      ]
    };
  }, []);
  return (
    <Animated.View
      style={[
        {
          width: ListItemWidth,
          aspectRatio: 1,
          borderRadius: ListItemWidth / 2,
          shadowColor: "#000",
          shadowOpacity: 0.5,
          shadowOffset: {
            width: 0,
            height: 0
          },
          shadowRadius: 10,
          elevation: 5
        },
        rStyle
      ]}
    >
      <Image
        source={imageSrc}
        style={{
          flex: 1,
          borderRadius: ListItemWidth / 2,
          borderColor: "white",
          borderWidth: 2
        }}
        placeholder={placeholder}
      />
    </Animated.View>
  );
};

export default function DemoScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <CircularCarousel data={data} />
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
