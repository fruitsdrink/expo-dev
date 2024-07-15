import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import Svg, { ClipPath, Ellipse, Image } from "react-native-svg";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming
} from "react-native-reanimated";
import { useState } from "react";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function DemoScreen() {
  const imagePosition = useSharedValue(1);
  const formButtonScale = useSharedValue(1);

  const [isRegister, setIsRegister] = useState(false);

  const rImageStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      imagePosition.value,
      [0, 1],
      [-SCREEN_HEIGHT / 2, 0]
    );
    return {
      transform: [{ translateY: withTiming(translateY, { duration: 1000 }) }]
    };
  }, [imagePosition]);

  const rButtonStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      imagePosition.value,
      [0, 1],
      [SCREEN_HEIGHT / 2, 0]
    );
    return {
      opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [
        {
          translateY: withTiming(translateY, { duration: 1000 })
        }
      ]
    };
  });

  const rCloseButtonStyle = useAnimatedStyle(() => {
    const rotate = interpolate(imagePosition.value, [0, 1], [180, 360]);

    return {
      opacity: withTiming(imagePosition.value ? 0 : 1, { duration: 800 }),
      transform: [{ rotate: withTiming(`${rotate}deg`, { duration: 1000 }) }]
    };
  });

  const rFormStyle = useAnimatedStyle(() => {
    return {
      opacity:
        imagePosition.value === 0
          ? withDelay(400, withTiming(1, { duration: 800 }))
          : withTiming(0, { duration: 300 })
    };
  });

  const rFormButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(formButtonScale.value, { duration: 200 })
        }
      ]
    };
  });

  const loginHandler = () => {
    imagePosition.value = 0;
    if (isRegister) {
      // setIsRegister(false);
      runOnJS(setIsRegister)(false);
    }
  };

  const registerHandler = () => {
    imagePosition.value = 0;
    if (!isRegister) {
      // setIsRegister(true);
      runOnJS(setIsRegister)(true);
    }
  };

  const closeHandler = () => {
    imagePosition.value = 1;
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <Animated.View style={[StyleSheet.absoluteFill, rImageStyle]}>
          <Svg width={SCREEN_WIDTH} height={SCREEN_HEIGHT + 100}>
            <ClipPath id="clipPathId">
              <Ellipse
                cx={SCREEN_WIDTH / 2}
                rx={SCREEN_HEIGHT}
                ry={SCREEN_HEIGHT + 100}
              />
            </ClipPath>
            <Image
              href={require("@/assets/images/day115/login-background.jpg")}
              width={SCREEN_WIDTH + 100}
              height={SCREEN_HEIGHT + 100}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#clipPathId)"
            />
          </Svg>
          <AnimatedPressable
            style={[styles.closeButtonContainer, rCloseButtonStyle]}
            onPress={closeHandler}
          >
            <Text>X</Text>
          </AnimatedPressable>
        </Animated.View>
        <View style={styles.bottomContianer}>
          <Animated.View style={rButtonStyle}>
            <Pressable style={styles.button} onPress={loginHandler}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </Pressable>
          </Animated.View>
          <Animated.View style={rButtonStyle}>
            <Pressable style={styles.button} onPress={registerHandler}>
              <Text style={styles.buttonText}>REGISTER</Text>
            </Pressable>
          </Animated.View>
          <Animated.View
            style={[
              styles.formInputContainer,
              StyleSheet.absoluteFill,
              rFormStyle
            ]}
          >
            <TextInput
              placeholder="Email"
              placeholderTextColor={"black"}
              style={styles.textInput}
            />
            {isRegister && (
              <TextInput
                placeholder="Full Name"
                placeholderTextColor={"black"}
                style={styles.textInput}
              />
            )}
            <TextInput
              placeholder="Password"
              placeholderTextColor={"black"}
              style={styles.textInput}
            />
            <Animated.View style={[styles.formButton, rFormButtonStyle]}>
              <Pressable
                onPress={() => {
                  formButtonScale.value = withSequence(
                    withSpring(1.2),
                    withSpring(1)
                  );
                }}
              >
                <Text style={styles.buttonText}>
                  {isRegister ? "REGISTER" : "LOGIN"}
                </Text>
              </Pressable>
            </Animated.View>
          </Animated.View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end"
  },
  closeButtonContainer: {
    height: 40,
    width: 40,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 1,
    backgroundColor: "white",
    borderRadius: 20,
    top: -20
  },
  bottomContianer: {
    justifyContent: "center",
    height: SCREEN_HEIGHT / 3
  },
  button: {
    backgroundColor: "rgba(123,104,238,0.8)",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "white"
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    letterSpacing: 0.5
  },
  formInputContainer: {
    paddingTop: 20,
    marginBottom: 70,
    zIndex: -1,
    justifyContent: "center"
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 25,
    paddingHorizontal: 10
  },
  formButton: {
    backgroundColor: "rgba(123,104,238,0.8)",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
});
