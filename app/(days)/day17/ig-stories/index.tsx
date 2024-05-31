import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable
} from "react-native";
import usersStories from "@/components/day17/stories";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import Animated, {
  Easing,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

export default function LgStoriesLayout() {
  const [userIndex, setUserIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);

  const progress = useSharedValue(0); // 0 -> 1

  const user = usersStories[userIndex];
  const story = user.stories[storyIndex];

  const goToPrevStorey = () => {
    if (storyIndex > 0) {
      setStoryIndex(storyIndex - 1);
    } else {
      goToPrevUser();
    }
  };
  const goToNextStorey = () => {
    if (storyIndex < user.stories.length - 1) {
      setStoryIndex(storyIndex + 1);
    } else {
      goToNextUser();
    }
  };

  const goToPrevUser = () => {
    if (userIndex > 0) {
      setUserIndex(userIndex - 1);
      setStoryIndex(0);
    } else {
      setUserIndex(usersStories.length - 1);
      setStoryIndex(0);
    }
  };
  const goToNextUser = () => {
    if (userIndex < usersStories.length - 1) {
      setUserIndex(userIndex + 1);
      setStoryIndex(0);
    } else {
      setUserIndex(0);
      setStoryIndex(0);
    }
  };

  const indeicatorAnimatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`
  }));

  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(1, { duration: 5000, easing: Easing.linear });
  }, [storyIndex, userIndex]);

  useAnimatedReaction(
    () => {
      return progress.value;
    },
    (currentValue, previousValue) => {
      if (currentValue !== previousValue && currentValue === 1) {
        // runOnJS(goToNextStorey)();
      }
    }
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <View style={styles.storeContainer}>
          <Image
            style={styles.image}
            source={{
              uri: story.uri
            }}
          />

          <Pressable style={styles.navPressable} onPress={goToPrevStorey} />

          <Pressable
            style={[styles.navPressable, { right: 0 }]}
            onPress={goToNextStorey}
          />

          <View style={styles.header}>
            <LinearGradient
              // Background Linear Gradient
              colors={["rgba(0,0,0,0.7)", "transparent"]}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.indicatorRow}>
              {user.stories.map((story, index) => (
                <View
                  key={`${user.userId}-${index}`}
                  style={styles.indicatorBG}
                >
                  <Animated.View
                    style={[
                      styles.indicator,
                      index === storyIndex && indeicatorAnimatedStyle,
                      index > storyIndex && { width: 0 },
                      index < storyIndex && { width: "100%" }
                    ]}
                  />
                </View>
              ))}
            </View>
            <Text style={styles.username}>{user.username}</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <TextInput
            style={styles.input}
            placeholder="Send message"
            placeholderTextColor={"white"}
          />
        </View>
        <StatusBar style="light" />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000"
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10
  },
  storeContainer: {
    flex: 1,
    backgroundColor: "#000"
  },
  header: {
    position: "absolute",
    top: 0,
    // backgroundColor: "rgba(0,0,0,0.15)",
    width: "100%",
    padding: 20,
    paddingTop: 10
  },
  indicatorRow: {
    gap: 5,
    flexDirection: "row",
    marginBottom: 20
  },
  indicatorBG: {
    flex: 1,
    height: 3,
    backgroundColor: "gray",
    borderRadius: 10,
    overflow: "hidden"
  },
  indicator: {
    backgroundColor: "white",
    height: "100%"
  },
  username: {
    color: "white",
    fontWeight: "bold"
  },
  footer: {
    width: "100%",
    backgroundColor: "black",
    padding: 20
  },
  input: {
    // borderWidth: StyleSheet.hairlineWidth,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 50,
    color: "white"
  },
  navPressable: {
    position: "absolute",
    width: "30%",
    height: "100%"
  }
});
