import {
  Dimensions,
  StyleSheet,
  View,
  Animated,
  Image,
  Text,
  TouchableOpacity
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import React, { useRef } from "react";

const { width, height } = Dimensions.get("screen");

const images = {
  man: "https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  women:
    "https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  kids: "https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  skullcandy:
    "https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  help: "https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
};

type Item = {
  key: string;
  title: string;
  image: string;
  ref: React.RefObject<View>;
};

const data = Object.keys(images).map((i) => ({
  key: i,
  title: i,
  image: images[i],
  ref: React.createRef<View>()
}));

const Tab = React.forwardRef<View, { item: Item; onItemPress: () => void }>(
  ({ item, onItemPress }, ref) => {
    return (
      <TouchableOpacity onPress={onItemPress}>
        <View ref={ref}>
          <Text
            style={{
              color: "white",
              fontSize: 84 / data.length,
              fontWeight: "800",
              textTransform: "uppercase"
            }}
          >
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
);

const Indicator = ({
  measures,
  scrollX
}: {
  measures: { x: number; y: number; width: number; height: number }[];
  scrollX: Animated.Value;
}) => {
  console.log("🐔 render Indicator");
  const inputRange = data.map((_, i) => i * width);

  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((m) => m.width)
  });

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((m) => m.x)
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
        bottom: -10,
        left: 0,
        height: 4,
        width: indicatorWidth,
        backgroundColor: "white",
        borderRadius: 4,
        transform: [
          {
            translateX
          }
        ]
      }}
    />
  );
};

const Tabs = ({
  data,
  scrollX,
  onItemPress
}: {
  data: Item[];
  scrollX: Animated.Value;
  onItemPress: (itemIndex: number) => void;
}) => {
  const containerRef = useRef<View>();
  const [measures, setMeasures] = React.useState<
    { x: number; y: number; width: number; height: number }[]
  >([]);

  React.useEffect(() => {
    const m = [];
    data.forEach((item) => {
      item.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          // console.log({
          //   x,
          //   y,
          //   width,
          //   height,
          //   index
          // });
          m.push({ x, y, width, height });

          if (m.length === data.length) {
            setMeasures(m);
          }
        },
        () => {
          console.log("measureLayout failed");
        }
      );
    });
  }, [containerRef.current]);

  console.log("🔥 measures:", measures);

  return (
    <View
      ref={containerRef}
      style={{
        position: "absolute",
        top: 100,
        width
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          flex: 1
        }}
      >
        {data.map((item, index) => {
          return (
            <Tab
              key={item.key}
              item={item}
              ref={item.ref}
              onItemPress={() => onItemPress(index)}
            />
          );
        })}
      </View>
      {measures.length > 0 && (
        <Indicator measures={measures} scrollX={scrollX} />
      )}
    </View>
  );
};

export default function DemoScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const ref = useRef<Animated.FlatList<Item>>(null);

  const onItemPress = React.useCallback((itemIndex: number) => {
    // ref.current.scrollToIndex({ index: itemIndex });
    ref.current.scrollToOffset({
      offset: itemIndex * width
    });
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <Animated.FlatList
          ref={ref}
          data={data}
          keyExtractor={(item) => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          pagingEnabled
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false
            }
          )}
          renderItem={({ item }) => {
            return (
              <View style={{ width, height }}>
                <Image
                  source={{ uri: item.image }}
                  style={{ flex: 1, resizeMode: "cover" }}
                />
                <View
                  style={[
                    StyleSheet.absoluteFillObject,
                    { backgroundColor: "rgba(0,0,0,0.3)" }
                  ]}
                />
              </View>
            );
          }}
        />
        <Tabs data={data} scrollX={scrollX} onItemPress={onItemPress} />
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
