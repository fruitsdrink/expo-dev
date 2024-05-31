import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Button,
  Text,
  Image
} from "react-native";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

import usersStories from "@/components/day17/stories";
const allStories = usersStories.flatMap((user) => user.stories);

// 最多4个面
const pages = ["#e1f3fa", "#308d46", "red", "yellow"];
const width = 200;

const AnimatedPage = ({
  pageColor,
  index,
  pageIndex,
  children
}: {
  pageColor: string;
  index: number;
  pageIndex: SharedValue<number>;
  children?: React.ReactNode;
}) => {
  // console.log("pageIndex: ", pageIndex.value);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        perspective: 300
      },
      {
        rotateY: `${interpolate(
          pageIndex.value,
          [index - 1, index, index + 1],
          [-90, 0, 90]
        )}deg`
      }
    ]
  }));

  return (
    <Animated.View
      style={[
        {
          zIndex: pages.length - index,
          width,
          position: "absolute",
          aspectRatio: 9 / 16,
          backgroundColor: pageColor,
          borderRadius: 10,
          transformOrigin: ["50%", "50%", -width / 2],
          backfaceVisibility: "hidden",
          overflow: "hidden"
        },
        animatedStyle
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default function LgStoriesLayout() {
  const pageIndex = useSharedValue(0);

  const goPrev = () => {
    // pageIndex.value = 0;
    pageIndex.value = withTiming(Math.floor(pageIndex.value - 1), {
      duration: 500
    });
  };

  const goNext = () => {
    // pageIndex.value = pageIndex.value + 1;
    // console.log("🚀 ~ goNext ~ pageIndex.value:", pageIndex.value);
    pageIndex.value = withTiming(Math.floor(pageIndex.value + 1), {
      duration: 500
    });
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        {/* <Stack /> */}

        {allStories.map((story, index) => (
          <AnimatedPage
            pageColor={"black"}
            pageIndex={pageIndex}
            index={index}
            key={index}
          >
            <Image
              source={{
                uri: story.uri
              }}
              style={{
                width: "100%",
                height: "100%"
              }}
            />
          </AnimatedPage>
        ))}

        <View
          style={{
            position: "absolute",
            bottom: 50,
            flexDirection: "row",
            gap: 10
          }}
        >
          <Button title="Prev" onPress={goPrev} />
          <Button title="Next" onPress={goNext} />
        </View>
        <StatusBar style="light" />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center"
  }
});
