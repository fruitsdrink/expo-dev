import { Button, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import { Stack } from "expo-router";
import LottieView from "lottie-react-native";

export default function AnimationScreen() {
  const animation = useRef<LottieView>(null);

  return (
    <>
      <Stack.Screen options={{ title: "Splash lottie" }} />
      <View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 200,
              height: 200,
            }}
            source={require("@/assets/lottie/netflix.lottie")}
          />
        </View>
        <Button title="Play" onPress={() => animation.current?.play()} />
        <Button title="Pause" onPress={() => animation.current?.pause()} />
        <Button title="Reset" onPress={() => animation.current?.reset()} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
