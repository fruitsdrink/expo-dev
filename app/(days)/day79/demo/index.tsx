import {
  Dimensions,
  Image,
  ImageProps,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { useCallback, useRef } from "react";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const BACKGROUND_COLOR = "#F1F1F1";

interface PageInterface extends Pick<ImageProps, "source"> {
  title: string;
  description: string;
}
const PAGES: PageInterface[] = [
  {
    title: "Samurai",
    description:
      "A durable deck featured with a menacing face of a samurai at the center of the underside accompanied with a large red sun motif.",
    source: require("@/assets/images/day79/01.png")
  },
  {
    title: "Reject",
    description:
      "You don't have time to consider wheter the graphic on your CSS board would be considered modernist.",
    source: require("@/assets/images/day79/02.png")
  },
  {
    title: "Great Wave",
    description:
      "The top of the deck has the same matching graphic in black outline and embodies an overall mellow concave.",
    source: require("@/assets/images/day79/03.png")
  }
];

type PageProps = {
  page: PageInterface;
  translateX: SharedValue<number>;
  index: number;
};
const Page: React.FC<PageProps> = ({ page, translateX, index }) => {
  const inputRange = [
    (index - 1) * SCREEN_WIDTH,
    index * SCREEN_WIDTH,
    (index + 1) * SCREEN_WIDTH
  ];

  const rCircleStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }]
    };
  });

  const rImageStyle = useAnimatedStyle(() => {
    const progress = interpolate(
      translateX.value,
      inputRange,
      [0, 0, 1],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [0.5, 1, 0.5],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [{ rotate: `${progress * Math.PI}rad` }]
    };
  });

  return (
    <View style={pageStyles.container}>
      <View style={pageStyles.circleContainer}>
        <Animated.View style={[pageStyles.circle, rCircleStyle]} />
        <Animated.Image
          source={page.source}
          style={[pageStyles.image, rImageStyle]}
          resizeMode="contain"
        />
      </View>
      <Text style={pageStyles.title}>{page.title}</Text>
      <Text style={pageStyles.description}>{page.description}</Text>
    </View>
  );
};

const CIRCLE_WIDTH = SCREEN_WIDTH * 0.7;

const pageStyles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },
  circleContainer: {
    width: CIRCLE_WIDTH,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 120
  },
  image: {
    position: "absolute",
    height: SCREEN_HEIGHT * 0.5,
    aspectRatio: 1
  },
  circle: {
    width: "100%",
    height: "100%",
    borderRadius: CIRCLE_WIDTH / 2,
    backgroundColor: "white"
  },
  title: {
    textAlign: "center",
    fontSize: 35,
    fontWeight: "700",
    marginBottom: 15
  },
  description: {
    textAlign: "center",
    fontSize: 14,
    color: "grey"
  }
});

type DotProps = {
  activeDotIndex: SharedValue<number>;
  index: number;
};
const Dot: React.FC<DotProps> = ({ activeDotIndex, index }) => {
  const rStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        activeDotIndex.value === index ? "#000" : "#fff",
        { duration: 150 }
      )
    };
  });

  return <Animated.View style={[dotStyles.dot, rStyle]} />;
};

const dotStyles = StyleSheet.create({
  dot: {
    width: 20,
    aspectRatio: 1,
    borderRadius: 10,
    // backgroundColor: "#000",
    marginHorizontal: 5,
    borderWidth: 1
  }
});

export default function DemoScreen() {
  const translateX = useSharedValue(0);

  const activeIndex = useDerivedValue(() => {
    return Math.round(translateX.value / SCREEN_WIDTH);
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (ev) => {
      translateX.value = ev.contentOffset.x;
    }
  });

  const scrllRef = useAnimatedRef<ScrollView>();

  const onIconPress = useCallback(() => {
    if (activeIndex.value === PAGES.length - 1) return;
    scrllRef.current?.scrollTo({
      x: (activeIndex.value + 1) * SCREEN_WIDTH,
      animated: true
    });
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <Animated.ScrollView
          ref={scrllRef}
          style={{ flex: 1 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={scrollHandler}
          scrollEventThrottle={16}
        >
          {PAGES.map((page, index) => {
            return (
              <Page
                key={index}
                page={page}
                translateX={translateX}
                index={index}
              />
            );
          })}
        </Animated.ScrollView>
        <View style={styles.footer}>
          {/* Paginator */}
          <View style={[styles.fillCenter, { flexDirection: "row" }]}>
            {PAGES.map((_, index) => {
              return (
                <Dot key={index} activeDotIndex={activeIndex} index={index} />
              );
            })}
          </View>
          {/* Text Container */}
          <View style={styles.fillCenter}>
            <Text style={styles.text}>View Board</Text>
          </View>
          {/* Icon Containier */}
          <View style={styles.fillCenter}>
            <AntDesign
              name="arrowright"
              size={24}
              color={"#000"}
              onPress={onIconPress}
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR
  },
  footer: {
    height: 50,
    marginBottom: 50,
    flexDirection: "row",
    alignItems: "center"
  },
  fillCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 1.7
  }
});
