import {
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { useEffect, useRef, useState } from "react";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function DemoScreen() {
  const [isHearted, setIsHearted] = useState(false);
  const lastTap = useRef(0);
  const isAnimating = useRef(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isHearted) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }).start(() => (isAnimating.current = false));
    } else {
      animatedValue.setValue(0);
      isAnimating.current = false;
    }
  }, [animatedValue, isHearted]);

  const heartAnimation = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 0.1, 0.8, 1],
          outputRange: [0, 2, 2, 1]
        })
      },
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 0.1, 0.8, 1],
          outputRange: [0, -40, -40, 1]
        })
      }
    ]
  } as any;

  const heartCircleAnimation = {
    opacity: animatedValue
  } as const;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.messageContainer}
          onPress={() => {
            const now = Date.now();
            const DELAY = 300;
            if (lastTap.current && now - lastTap.current < DELAY) {
              if (!isAnimating.current) {
                setIsHearted(!isHearted);
                isAnimating.current = true;
              }
            } else {
              lastTap.current = now;
            }
          }}
        >
          <Image
            style={styles.messageAvatar}
            source={require("@/assets/images/day97/girl1.jpeg")}
          />
          <View style={styles.messageContent}>
            <Text style={styles.messageText}>
              Like and subscribe to Minh Techie channel
            </Text>
          </View>

          {isHearted && (
            <View style={styles.heartContainer}>
              <Animated.View
                style={[styles.heartCircle, heartCircleAnimation]}
              />
              <Animated.Image
                style={[styles.heartIcon, heartAnimation]}
                source={require("@/assets/images/day97/heart.png")}
              />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  messageContainer: {
    flexDirection: "row"
  },
  messageAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 8
  },
  messageContent: {
    width: SCREEN_WIDTH * 0.7,
    backgroundColor: "#19A3FE",
    borderRadius: 8,
    padding: 8
  },
  messageText: {
    fontSize: 20,
    color: "white"
  },
  heartContainer: {
    position: "absolute",
    bottom: -8,
    right: 0,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  heartCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "white",
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: "grey",
        shadowOpacity: 1,
        shadowRadius: 1,
        shadowOffset: {
          width: 0.5,
          height: 0.5
        }
      }
    })
  },
  heartIcon: {
    position: "absolute",
    width: 18,
    height: 18
  }
});
