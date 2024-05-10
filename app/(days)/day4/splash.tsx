import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import LottieView from "lottie-react-native";
import Animated, { ZoomOut, ZoomOutUp } from "react-native-reanimated";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export default function SplashScreen() {
  const [isFinish, setIsFinish] = React.useState(false);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isFinish ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Pressable onPress={() => router.back()}>
              <Text
                style={{
                  color: "white",
                  fontSize: 24,
                }}
              >
                退回上一页
              </Text>
            </Pressable>
          </View>
        ) : (
          <AnimatedLottieView
            exiting={ZoomOutUp}
            autoPlay
            style={{
              width: "80%",
              maxWidth: 400,
              aspectRatio: 1,
            }}
            source={require("@/assets/lottie/netflix.lottie")}
            loop={false}
            onAnimationFinish={() => {
              setIsFinish(true);
            }}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
