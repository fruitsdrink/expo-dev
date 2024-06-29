import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import React, { useRef } from "react";

const data = [
  {
    type: "Humlan P",
    imageUri: require("@/assets/images/day96/urbanears_blue.png"),
    heading: "Vibrant colors",
    description: "Four on-trend colorways to seamlessly suit your style.",
    key: "first",
    color: "#9dcdfa"
  },
  {
    type: "Pampas",
    imageUri: require("@/assets/images/day96/urbanears_pink.png"),
    heading: "Redefined sound",
    description: "A bold statement tuned to perfection.",
    key: "second",
    color: "#db9efa"
  },
  {
    type: "Humlan P",
    imageUri: require("@/assets/images/day96/urbanears_grey.png"),
    heading: "Great quality",
    description:
      "An Urbanears classic! Listen-all-day fit. Striking the perfect balance of effortless technology",
    key: "third",
    color: "#999"
  },
  {
    type: "Humlan B",
    imageUri: require("@/assets/images/day96/urbanears_mint.png"),
    heading: "From Sweden",
    description:
      "The “Plattan” in Plattan headphones is Swedish for “the slab.”",
    key: "fourth",
    color: "#a1e3a1"
  }
];

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const LOGO_WIDTH = 220;
const LOGO_HEIGHT = 40;
const DOT_SIZE = 40;
const TICKER_HEIGHT = 40;
const CIRCLE_SIZE = SCREEN_WIDTH * 0.6;

type CircleProps = {
  scrollX: Animated.Value;
};

const Circle: React.FC<CircleProps> = ({ scrollX }) => {
  return (
    <View style={circleStyles.container}>
      {data.map((item, index) => {
        const inputRange = [
          (index - 0.55) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 0.55) * SCREEN_WIDTH
        ];

        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
          extrapolate: "clamp"
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 0.2, 0]
        });

        return (
          <Animated.View
            key={index}
            style={[
              circleStyles.circle,
              { backgroundColor: item.color },
              { opacity, transform: [{ scale }] }
            ]}
          />
        );
      })}
    </View>
  );
};

const circleStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center"
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: "absolute",
    top: "15%"
  }
});

type TickerProps = {
  scrollX: Animated.Value;
};

const Ticker: React.FC<TickerProps> = ({ scrollX }) => {
  const inputRange = [-SCREEN_WIDTH, 0, SCREEN_WIDTH];
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [TICKER_HEIGHT, 0, -TICKER_HEIGHT]
  });

  return (
    <View style={tickerStyles.container}>
      <Animated.View
        style={[
          {
            transform: [{ translateY }]
          }
        ]}
      >
        {data.map((item, index) => {
          return (
            <Text key={index} style={tickerStyles.text}>
              {item.type}
            </Text>
          );
        })}
      </Animated.View>
    </View>
  );
};

const tickerStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 20,
    // backgroundColor: "red"
    overflow: "hidden",
    height: TICKER_HEIGHT
  },
  text: {
    fontSize: TICKER_HEIGHT,
    lineHeight: TICKER_HEIGHT,
    textTransform: "uppercase",
    letterSpacing: 2,
    fontWeight: "800"
  }
});

type ItemProps = {
  imageUri: React.ComponentProps<typeof Image>["source"];
  heading: string;
  description: string;
  index: number;
  scrollX: Animated.Value;
};
const Item: React.FC<ItemProps> = ({
  imageUri,
  heading,
  description,
  index,
  scrollX
}) => {
  const inputRange = [
    (index - 1) * SCREEN_WIDTH,
    index * SCREEN_WIDTH,
    (index + 1) * SCREEN_WIDTH
  ];
  const inputRangeOpacity = [
    (index - 0.3) * SCREEN_WIDTH,
    index * SCREEN_WIDTH,
    (index + 0.3) * SCREEN_WIDTH
  ];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0]
  });

  const translateXHeading = scrollX.interpolate({
    inputRange,
    outputRange: [SCREEN_WIDTH * 0.1, 0, -SCREEN_WIDTH * 0.1]
  });
  const translateXDescription = scrollX.interpolate({
    inputRange,
    outputRange: [SCREEN_WIDTH * 0.7, 0, -SCREEN_WIDTH * 0.7]
  });

  const opacity = scrollX.interpolate({
    inputRange: inputRangeOpacity,
    outputRange: [0, 1, 0]
  });

  return (
    <View style={itemStyles.container}>
      <Animated.Image
        source={imageUri}
        style={[itemStyles.image, { opacity, transform: [{ scale }] }]}
      />
      <View style={itemStyles.textContainer}>
        <Animated.Text
          style={[
            itemStyles.heading,
            { transform: [{ translateX: translateXHeading }] }
          ]}
        >
          {heading}
        </Animated.Text>
        <Animated.Text
          style={[
            itemStyles.description,
            {
              transform: [{ translateX: translateXDescription }]
            }
          ]}
        >
          {description}
        </Animated.Text>
      </View>
    </View>
  );
};

const itemStyles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: SCREEN_WIDTH * 0.75,
    height: SCREEN_WIDTH * 0.75,
    resizeMode: "contain",
    flex: 1
  },
  textContainer: {
    alignItems: "flex-start",
    alignSelf: "flex-end",
    flex: 0.5
  },
  heading: {
    color: "#444",
    textTransform: "uppercase",
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 5
  },
  description: {
    color: "#ccc",
    fontWeight: "600",
    textAlign: "left",
    width: SCREEN_WIDTH * 0.75,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5
  }
});

type PaginationProps = {
  scrollX: Animated.Value;
};
const Pagination: React.FC<PaginationProps> = ({ scrollX }) => {
  const inputRange = [-SCREEN_WIDTH, 0, SCREEN_WIDTH];
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [-DOT_SIZE, 0, DOT_SIZE]
  });

  return (
    <View style={paginationStyles.container}>
      <Animated.View
        style={[
          paginationStyles.indicator,
          {
            transform: [{ translateX }]
          }
        ]}
      />
      {data.map((item) => {
        return (
          <View key={item.key} style={paginationStyles.dotContainer}>
            <View
              style={[paginationStyles.dot, { backgroundColor: item.color }]}
            />
          </View>
        );
      })}
    </View>
  );
};

const paginationStyles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 20,
    bottom: 40,
    flexDirection: "row",
    height: DOT_SIZE
  },
  indicator: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 2,
    borderColor: "#ddd",
    position: "absolute"
  },
  dotContainer: {
    width: DOT_SIZE,
    alignItems: "center",
    justifyContent: "center"
    // backgroundColor: "red",
    // borderRadius: DOT_SIZE / 2
  },
  dot: {
    width: DOT_SIZE * 0.3,
    height: DOT_SIZE * 0.3,
    borderRadius: DOT_SIZE * 0.15
  }
});

export default function DemoScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <Circle scrollX={scrollX} />
        <Animated.FlatList
          data={data}
          keyExtractor={(item) => item.key.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          renderItem={({ item, index }) => {
            return <Item {...item} index={index} scrollX={scrollX} />;
          }}
        />
        <Image
          source={require("@/assets/images/day96/ue_black_logo.png")}
          style={styles.logo}
        />
        <Pagination scrollX={scrollX} />
        <Ticker scrollX={scrollX} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    opacity: 0.9,
    height: LOGO_HEIGHT,
    width: LOGO_WIDTH,
    resizeMode: "contain",
    position: "absolute",
    left: 10,
    bottom: 10,
    transform: [
      { translateX: -LOGO_WIDTH / 2 },
      { translateY: -LOGO_HEIGHT / 2 },
      { rotateZ: "-90deg" },
      { translateX: LOGO_WIDTH / 2 },
      { translateY: LOGO_HEIGHT / 2 }
    ]
  } as const
});
