import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Link, Stack, router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { fonts } from "@/constants";
import { StatusBar } from "expo-status-bar";
import {
  GestureDetector,
  Gesture,
  Directions,
} from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
} from "react-native-reanimated";

const onboardingSteps = [
  {
    icon: "bank",
    title: "Welcome #DEVember",
    description: "Daily React Native tutorials during December",
  },
  {
    icon: "users",
    title: "Learn and grow together",
    description: "Learn by building 24 projects with React Native and Expo",
  },
  {
    icon: "book",
    title: "Education for Children",
    description:
      'Contribute to the fundraiser "Education for Children" to help Save the Children in their effort of providing education to every child',
  },
];

export default function OnboardingScreen() {
  const [screenIndex, setScreenIndex] = useState(0);

  const data = onboardingSteps[screenIndex];

  const onContinue = () => {
    const isLastScreen = screenIndex === onboardingSteps.length - 1;
    if (isLastScreen) {
      endOnboarding();
    } else {
      setScreenIndex(screenIndex + 1);
    }
  };

  const onBack = () => {
    const isFirstScreen = screenIndex === 0;
    if (isFirstScreen) {
      endOnboarding();
    } else {
      setScreenIndex(screenIndex - 1);
    }
  };

  const endOnboarding = () => {
    setScreenIndex(0);
    router.back();
  };

  const swipes = Gesture.Simultaneous(
    Gesture.Fling().runOnJS(true).direction(Directions.LEFT).onEnd(onContinue),
    Gesture.Fling().runOnJS(true).direction(Directions.RIGHT).onEnd(onBack)
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      <SafeAreaView style={styles.page}>
        <View style={styles.stepIndicatorContainer}>
          {onboardingSteps.map((_, index) => (
            <View
              style={[
                styles.stepIndicator,
                {
                  backgroundColor: index === screenIndex ? "#cef202" : "gray",
                },
              ]}
              key={index}
            />
          ))}
        </View>
        <GestureDetector gesture={swipes}>
          <View style={styles.pageContent} key={screenIndex}>
            <Animated.View
              entering={FadeIn}
              exiting={FadeOut}
              // key={`img-${screenIndex}`}
            >
              <FontAwesome
                style={styles.image}
                name={data.icon as any}
                size={150}
                color="#cef202"
              />
            </Animated.View>
            <View style={styles.footer}>
              <Animated.Text
                entering={SlideInRight}
                exiting={SlideOutLeft}
                style={styles.title}
                // key={`title-${screenIndex}`}
              >
                {data.title}
              </Animated.Text>
              <Animated.Text
                entering={FadeIn.delay(100)}
                exiting={FadeOut}
                style={styles.description}
                // key={`desc-${screenIndex}`}
              >
                {data.description}
              </Animated.Text>
            </View>
            <View style={styles.buttonsRow}>
              <Text onPress={endOnboarding} style={styles.buttonText}>
                Skip
              </Text>

              <Pressable style={styles.button} onPress={onContinue}>
                <Text style={styles.buttonText}>Continue</Text>
              </Pressable>
            </View>
          </View>
        </GestureDetector>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#15141a",
  },
  pageContent: {
    flex: 1,
    padding: 20,
  },
  image: {
    alignSelf: "center",
    margin: 20,
    marginTop: 50,
  },
  footer: {
    marginTop: "auto",
  },
  title: {
    color: "#fdfdfd",
    fontSize: 50,
    fontFamily: fonts.InterBold,
    letterSpacing: 1.3,

    marginVertical: 10,
  },
  description: {
    color: "gray",
    fontSize: 20,
    fontFamily: fonts.Inter,
    lineHeight: 28,
  },
  buttonsRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  button: {
    flex: 1,
    backgroundColor: "#302e38",
    borderRadius: 50,
    alignItems: "center",
  },
  buttonText: {
    color: "#fdfdfd",
    fontFamily: fonts.InterSemi,
    fontSize: 16,
    padding: 15,
    paddingHorizontal: 25,
  },
  stepIndicatorContainer: {
    flexDirection: "row",
    gap: 5,
    marginHorizontal: 15,
  },
  stepIndicator: {
    flex: 1,
    height: 5,
    backgroundColor: "gray",
    borderRadius: 10,
  },
});
