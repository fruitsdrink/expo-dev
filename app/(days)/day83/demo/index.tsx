import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { Stack } from "expo-router";
import Swiper from "react-native-swiper";
import { useRef, useState } from "react";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const slides = [
  {
    title: "Welcome to App!",
    message: "The simplest and safest way to access your favorite app.",
    action: "Get started"
  },
  {
    title: "The future is here",
    message:
      "Proident ipsum sunt qui aliquip veniam deserunt sint minim cupidatat amet",
    action: "Continue"
  },
  {
    title: "Here's the great news",
    message:
      "Proident ipsum sunt qui aliquip veniam deserunt sint minim cupidatat amet",
    action: "Create your account"
  }
];

const imageUri = "https://assets.withfra.me/Landing.1.png";

export default function DemoScreen() {
  const [slide, setSlide] = useState(0);
  const swiperRef = useRef<Swiper>(null);

  const contentOpacity = useRef(new Animated.Value(1)).current;
  const scrollX = useRef(new Animated.Value(0)).current;
  console.log("🚀 ~ DemoScreen ~ scrollX:", scrollX);

  const animatedBackgroundLeft = scrollX.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [1, 0, -1]
  });
  console.log(
    "🚀 ~ DemoScreen ~ animatedBackgroundLeft:",
    animatedBackgroundLeft
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <Animated.View style={{ left: animatedBackgroundLeft }}>
          <Image
            source={{ uri: imageUri }}
            resizeMode="contain"
            style={styles.slideImage}
          />
        </Animated.View>
        <Swiper
          ref={swiperRef}
          loop={false}
          showsPagination={false}
          onIndexChanged={setSlide}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX
                  }
                }
              }
            ],
            {
              useNativeDriver: false
            }
          )}
          onTouchStart={() => {
            Animated.timing(contentOpacity, {
              toValue: 0,
              duration: 250,
              useNativeDriver: true
            }).start();
          }}
          onTouchEnd={() => {
            Animated.timing(contentOpacity, {
              toValue: 1,
              duration: 250,
              useNativeDriver: true
            }).start();
          }}
          scrollEventThrottle={1}
        >
          {slides.map(({ title, message, action }, index) => (
            <Animated.View
              key={index}
              style={[styles.slide, { opacity: contentOpacity }]}
            >
              <Text style={styles.slideTitle}>{action}</Text>
              <Text style={styles.slideText}>{message}</Text>
              <TouchableOpacity
                onPress={() => {
                  swiperRef.current.scrollTo(slide + 1, true);
                }}
              >
                <View style={styles.button}>
                  <Text style={styles.buttonText}>{action}</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </Swiper>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1f26"
  },
  slide: {
    flex: 1,
    backgroundColor: "transparent",
    position: "relative",
    justifyContent: "flex-end",
    paddingHorizontal: 36
  },
  slideImage: {
    width: SCREEN_WIDTH * slides.length,
    height: SCREEN_HEIGHT * 0.6,
    position: "absolute",
    top: 47,
    left: 0
  },
  slideTitle: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center"
  },
  slideText: {
    fontSize: 16,
    color: "#a9b1cf",
    fontWeight: "500",
    textAlign: "center"
  },
  button: {
    backgroundColor: "#1e5afb",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 36,
    marginVertical: 48
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center"
  }
});
