import {
  Animated,
  ColorValue,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import React from "react";
import Svg, { Rect, RadialGradient, Defs, Stop } from "react-native-svg";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const PRODUCT_LIST = [
  {
    id: "s02h02e02c02",
    title: "TMA-2",
    subtitle: "DJ PRESET",
    description:
      "This configuration is based on the original TMA-1 DJ, which is the preferred choice of a range of acclaimed DJs.",
    price: "200€",
    bg: "#16CDC1",
    imgUrl: require("@/assets/images/day99/01.png")
  },
  {
    id: "s74h02e02c74",
    title: "TMA-2",
    subtitle: "ED BANGER EDITION",
    description:
      "This combination provides a very heavy and powerful bass. Recommended for bass lovers and those who like it loud. Limited edition of 300.",
    price: "240€",
    bg: "#bbb",
    imgUrl: require("@/assets/images/day99/02.avif")
  },
  {
    id: "s04h71e05c71",
    title: "TMA-2",
    subtitle: "YOUNG GURU PRESET",
    description:
      "This configuration provides open, vibrant sound with good bass and treble. Wide sound stage and medium isolation.",
    price: "260€",
    bg: "palevioletred",
    imgUrl: require("@/assets/images/day99/03.avif")
  },
  {
    id: "s03h03e04c02",
    title: "TMA-2",
    subtitle: "STUDIO PRESET",
    description:
      "This configuration provides a warm sound and it is good for extended listening. Great bass and added energy in the lower mid range.",
    price: "225€",
    bg: "#629BF0",
    imgUrl: require("@/assets/images/day99/04.avif")
  }
];

type RadialGradientProps = {
  color: ColorValue;
  scrollX: Animated.Value;
  inputRange: number[];
};
const RendeerRadialGradient: React.FC<RadialGradientProps> = ({
  color,
  scrollX,
  inputRange
}) => {
  const rotate = scrollX.interpolate({
    inputRange,
    outputRange: ["0deg", "-15deg", "0deg", "15deg"]
  });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [0, SCREEN_WIDTH, 0, -SCREEN_WIDTH]
  });
  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [1, 0.5, 1, 0.5]
  });

  return (
    <Animated.View
      style={[
        styles.svgContainer,
        {
          transform: [{ rotate }, { translateX }],
          opacity
        }
      ]}
    >
      <Svg width={SCREEN_WIDTH} height={SCREEN_HEIGHT}>
        <Defs>
          <RadialGradient
            id="grad"
            cx={"50%"}
            cy={"35%"}
            r={"60%"}
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset={"0%"} stopColor={"#fff"} stopOpacity={"1"} />
            <Stop offset={"100%"} stopColor={color} stopOpacity={"1"} />
          </RadialGradient>
        </Defs>
        <Rect
          x={"0"}
          y={0}
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
          fill={"url(#grad)"}
          fillOpacity={0.9}
        />
      </Svg>
    </Animated.View>
  );
};

export default function DemoScreen() {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />

        <Animated.ScrollView
          contentContainerStyle={styles.scrollViewContianer}
          pagingEnabled
          scrollEventThrottle={16}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: true
            }
          )}
        >
          {PRODUCT_LIST.map((item, index) => {
            const inputRange = [
              (index - 2) * SCREEN_WIDTH,
              (index - 1) * SCREEN_WIDTH,
              index * SCREEN_WIDTH,
              (index + 1) * SCREEN_WIDTH
            ];

            const imageSclae = scrollX.interpolate({
              inputRange,
              outputRange: [1, 0.4, 1, 0.4]
            });

            const imageOpacity = scrollX.interpolate({
              inputRange,
              outputRange: [1, 0.2, 1, 0.2]
            });

            return (
              <View key={item.id} style={[styles.container, styles.item]}>
                <Animated.Image
                  source={item.imgUrl}
                  style={[
                    styles.image,
                    {
                      opacity: imageOpacity,
                      transform: [{ scale: imageSclae }]
                    }
                  ]}
                />
                <Animated.View
                  style={[
                    styles.metaContainer,
                    {
                      opacity: imageOpacity
                    }
                  ]}
                >
                  <Text style={[styles.font, styles.title]}>{item.title}</Text>
                  <Text style={[styles.font, styles.subTitle]}>
                    {item.description}
                  </Text>
                  <Text style={[styles.font, styles.description]}>
                    {item.subtitle}
                  </Text>
                  <Text style={[styles.font, styles.price]}>{item.price}</Text>
                </Animated.View>
                <RendeerRadialGradient
                  color={item.bg}
                  inputRange={inputRange}
                  scrollX={scrollX}
                />
              </View>
            );
          })}
        </Animated.ScrollView>
        <Image
          source={require("@/assets/images/day99/logo.png")}
          style={styles.logoImage}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center"
  },
  logoImage: {
    width: SCREEN_WIDTH / 7,
    height: SCREEN_WIDTH / 7,
    aspectRatio: 1,
    resizeMode: "contain",
    position: "absolute",
    top: 50
  },
  scrollViewContianer: {
    justifyContent: "center",
    alignItems: "center"
  },
  item: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: SCREEN_WIDTH * 0.85,
    height: SCREEN_WIDTH * 0.85,
    resizeMode: "contain"
  },
  metaContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "transprent",
    padding: 15
  },
  font: {
    fontFamily: "Menlo",
    color: "#222"
  },
  title: {
    fontSize: 36,
    fontWeight: "900"
  },
  subTitle: {
    fontSize: 10,
    fontWeight: "900"
  },
  description: {
    fontSize: 14,
    marginVertical: 15,
    textAlign: "center"
  },
  price: {
    fontSize: 42,
    fontWeight: "400"
  },
  svgContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1
  }
});
