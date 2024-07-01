import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Platform,
  StatusBar
} from "react-native";

import { Stack } from "expo-router";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const images = [
  {
    id: 1,
    uri: "https://images.unsplash.com/photo-1719670046288-f03275608b76?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8"
  },
  {
    id: 2,
    uri: "https://images.unsplash.com/photo-1719150006674-da2bbf9b94c2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8"
  },
  {
    id: 3,
    uri: "https://images.unsplash.com/photo-1718938610103-7a5a6f9773b1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8"
  },
  {
    id: 4,
    uri: "https://images.unsplash.com/photo-1719715845503-79c03b15ca55?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90b3MtZmVlZHw0MHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 5,
    uri: "https://images.unsplash.com/photo-1719564286461-733e18cb961e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90b3MtZmVlZHw2Mnx8fGVufDB8fHx8fA%3D%3D"
  }
];

const HEADER_HEIGHT =
  Platform.OS === "ios" ? 115 : 70 + StatusBar.currentHeight;

export default function DemoScreen() {
  const translationY = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => {
    const headerY = interpolate(
      translationY.value,
      [0, HEADER_HEIGHT],
      [0, -HEADER_HEIGHT],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY: headerY }]
    };
  });

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y;
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar hidden />
      <View style={{ flex: 1 }}>
        <Animated.View
          style={[
            {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: HEADER_HEIGHT,
              backgroundColor: "#333",
              zIndex: 1000,
              elevation: 1000,
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 45
            },
            rStyle
          ]}
        >
          <Text style={{ color: "white" }}>Animated Header</Text>
        </Animated.View>

        <Animated.ScrollView
          scrollEventThrottle={16}
          bounces={false}
          onScroll={scrollHandler}
          style={{
            paddingTop: HEADER_HEIGHT
          }}
        >
          {images.map((image, index) => {
            return (
              <View key={image.id} style={{ height: 400, margin: 20 }}>
                <Image
                  source={{ uri: image.uri }}
                  style={{
                    flex: 1,
                    borderRadius: 10
                  }}
                />
              </View>
            );
          })}
        </Animated.ScrollView>
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
