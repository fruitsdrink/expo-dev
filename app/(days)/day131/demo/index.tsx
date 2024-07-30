import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View
} from "react-native";
import { faker } from "@faker-js/faker";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import {
  Blur,
  Canvas,
  Circle,
  ColorMatrix,
  Group,
  Image,
  Paint,
  rect,
  RoundedRect,
  rrect,
  useClock,
  useImage
} from "@shopify/react-native-skia";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue
} from "react-native-reanimated";
import { useRef } from "react";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const dummaryArray = new Array(30).fill(0).map((_, i) => i + 1);
const imgUrl = faker.image.url();
const IMG_SIZE = 128;
const DynamicIslandWidth = 110;
const DynamicIslandHeight = 30;

export default function DemoScreen() {
  const x = useSharedValue((SCREEN_WIDTH - IMG_SIZE) / 2);
  const y = useSharedValue((230 - IMG_SIZE) / 2);
  const maxY = 70;
  const xDynamicIsland = useSharedValue(
    (SCREEN_WIDTH - DynamicIslandWidth) / 2
  );
  const scrollY = useSharedValue(0);
  const d = useSharedValue(IMG_SIZE);
  const blur = useSharedValue(0);
  const color = useSharedValue("transparent");

  const scrollRef = useRef<ScrollView>(null);

  const img = useImage(imgUrl);
  const roundedRect = useDerivedValue(() => {
    return rrect(
      rect(x.value, y.value, d.value, d.value),
      IMG_SIZE / 2,
      IMG_SIZE / 2
    );
  });

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.value = e.nativeEvent.contentOffset.y;
  };

  useDerivedValue(() => {
    d.value = interpolate(scrollY.value, [0, maxY / 2], [IMG_SIZE, 0]);
    x.value = (SCREEN_WIDTH - d.value) / 2;
    y.value = interpolate(scrollY.value, [0, maxY], [maxY, 0]);
    blur.value = interpolate(scrollY.value, [0, 30, 35], [0, 12, 0]);
    color.value = interpolateColor(
      scrollY.value,
      [0, 20],
      ["transparent", "#000"]
    );
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY.value, [0, maxY], [230, 0]),
      transform: [
        {
          translateY: interpolate(scrollY.value, [0, maxY], [0, maxY])
        }
      ]
    };
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar hidden />
      <ScrollView
        ref={scrollRef}
        style={styles.container}
        bounces={false}
        scrollEventThrottle={16}
        onScrollEndDrag={() => {
          if (scrollY.value < 30) {
            scrollRef.current.scrollTo({ y: 0, animated: true });
          } else {
            scrollRef.current.scrollTo({ y: 35, animated: true });
          }
        }}
        onScroll={onScroll}
      >
        <Animated.View style={animatedStyle}>
          <Canvas style={{ flex: 1 }}>
            <Group
              layer={
                <Paint>
                  <Blur blur={blur} />
                  <ColorMatrix
                    matrix={[
                      1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 20,
                      -7
                    ]}
                  />
                </Paint>
              }
            >
              <Group clip={roundedRect}>
                <Image
                  image={img}
                  width={d}
                  height={d}
                  fit={"cover"}
                  x={x}
                  y={y}
                />
                <Circle r={d} cx={x.value + 50} cy={y} color={color} />
              </Group>
              <RoundedRect
                r={30}
                width={DynamicIslandWidth}
                height={DynamicIslandHeight}
                x={xDynamicIsland}
                y={15}
              />
            </Group>
          </Canvas>
        </Animated.View>
        {dummaryArray.map((item) => {
          return (
            <View
              key={item}
              style={[
                styles.item,
                item % 2 === 0 ? styles.itemSmall : styles.itemBig
              ]}
            />
          );
        })}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dbdfea"
  },
  item: {
    marginHorizontal: 16,
    borderRadius: 12,
    marginVertical: 4
  },
  itemSmall: {
    height: 50,
    backgroundColor: "#acb1d6"
  },
  itemBig: {
    height: 100,
    backgroundColor: "#8d95d6"
  }
});
