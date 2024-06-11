import {
  Dimensions,
  StyleSheet,
  View,
  Animated,
  Image,
  Text
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { useRef } from "react";

const { width, height } = Dimensions.get("screen");

// https://www.flaticon.com/packs/retro-wave
// inspiration: https://dribbble.com/shots/11164698-Onboarding-screens-animation
// https://twitter.com/mironcatalin/status/1321180191935373312

const bgs = ["#A5BBFF", "#DDBEFE", "#FF63ED", "#B98EFF"];
const DATA = [
  {
    key: "3571572",
    title: "Multi-lateral intermediate moratorium",
    description:
      "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    image: "https://cdn-icons-png.flaticon.com/512/15170/15170612.png"
  },
  {
    key: "3571747",
    title: "Automated radical data-warehouse",
    description:
      "Use the optical SAS system, then you can navigate the auxiliary alarm!",
    image: "https://cdn-icons-png.flaticon.com/512/15170/15170621.png"
  },
  {
    key: "3571680",
    title: "Inverse attitude-oriented system engine",
    description:
      "The ADP array is down, compress the online sensor so we can input the HTTP panel!",
    image: "https://cdn-icons-png.flaticon.com/512/15170/15170625.png"
  },
  {
    key: "3571603",
    title: "Monitored global data-warehouse",
    description: "We need to program the open-source IB interface!",
    image: "https://cdn-icons-png.flaticon.com/512/15170/15170618.png"
  }
];

const Indicator = ({ scrollX }: { scrollX: Animated.Value }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        position: "absolute",
        bottom: 100,
        gap: 10
      }}
    >
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: "clamp"
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: "clamp"
        });

        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: "#fff ",
              opacity,
              transform: [
                {
                  scale
                }
              ]
            }}
          />
        );
      })}
    </View>
  );
};

const Backdrop = ({ scrollX }: { scrollX: Animated.Value }) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => width * i),
    outputRange: bgs.map((bg) => bg)
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor
        }
      ]}
    />
  );
};

const Square = ({ scrollX }: { scrollX: Animated.Value }) => {
  // 0 - 1
  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1
  );

  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["35deg", "-35deg", "35deg"]
  });

  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0]
  });

  return (
    <Animated.View
      style={{
        width: height,
        height,
        backgroundColor: "#fff",
        borderRadius: 86,
        position: "absolute",
        top: -height * 0.6,
        left: -height * 0.3,
        transform: [
          {
            rotate
          },
          {
            translateX
          }
        ]
      }}
    />
  );
};

export default function Day42DemoScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <Backdrop scrollX={scrollX} />
        <Square scrollX={scrollX} />
        <Animated.FlatList
          data={DATA}
          keyExtractor={(item) => item.key}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={32}
          contentContainerStyle={{ paddingBottom: 100 }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  width,
                  alignItems: "center",
                  padding: 20
                }}
              >
                <View
                  style={{
                    flex: 0.7,
                    justifyContent: "center"
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: width / 2,
                      height: width / 2,
                      resizeMode: "contain"
                    }}
                  />
                </View>
                <View style={{ flex: 0.3 }}>
                  <Text
                    style={{
                      color: "#fff",
                      fontWeight: "800",
                      fontSize: 24,
                      marginBottom: 10
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text style={{ color: "#fff", fontWeight: "300" }}>
                    {item.description}
                  </Text>
                </View>
              </View>
            );
          }}
        />
        <Indicator scrollX={scrollX} />
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
