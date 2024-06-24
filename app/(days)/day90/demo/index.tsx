import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  Text,
  StyleProp,
  ViewStyle,
  TouchableWithoutFeedback,
  Animated
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import React, { useRef, useState } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

type FloatingButtonProps = {
  style?: StyleProp<ViewStyle>;
};
const FloatingButton: React.FC<FloatingButtonProps> = ({ style }) => {
  const animation = useRef(new Animated.Value(0)).current;
  const [open, setOpne] = useState(false);

  const toggleMenu = () => {
    const toValue = open ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      friction: 6,
      useNativeDriver: true
    }).start();
    setOpne(!open);
  };

  const pinyStyle: StyleProp<ViewStyle> = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -80],
          extrapolate: "clamp"
        })
      }
    ]
  };

  const thumbStyle: StyleProp<ViewStyle> = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -140],
          extrapolate: "clamp"
        })
      }
    ]
  };

  const heartStyle: StyleProp<ViewStyle> = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -200],
          extrapolate: "clamp"
        })
      }
    ]
  };

  const opacity: StyleProp<ViewStyle> = {
    opacity: animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1]
    })
  };

  const rotateStyle = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "45deg"]
        })
      }
    ]
  };

  return (
    <View style={[floatingButtonStyles.container, style]}>
      <TouchableWithoutFeedback>
        <Animated.View
          style={[
            floatingButtonStyles.button,
            floatingButtonStyles.secondary,
            heartStyle,
            opacity
          ]}
        >
          <AntDesign name="hearto" size={20} color="#f02a4b" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback>
        <Animated.View
          style={[
            floatingButtonStyles.button,
            floatingButtonStyles.secondary,
            thumbStyle,
            opacity
          ]}
        >
          <Entypo name="thumbs-up" size={20} color="#f02a4b" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback>
        <Animated.View
          style={[
            floatingButtonStyles.button,
            floatingButtonStyles.secondary,
            pinyStyle,
            opacity
          ]}
        >
          <Entypo name="location-pin" size={20} color="#f02a4b" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={toggleMenu}>
        <Animated.View
          style={[
            floatingButtonStyles.button,
            floatingButtonStyles.menu,
            rotateStyle
          ]}
        >
          <AntDesign name="plus" size={24} color="#fff" />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const floatingButtonStyles = StyleSheet.create({
  container: {
    position: "absolute",
    alignItems: "center"
  },
  button: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowRadius: 10,
    shadowColor: "#f02a4b",
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.3,
    alignSelf: "center"
  },
  menu: {
    backgroundColor: "#f02a4b"
  },
  secondary: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#fff"
  }
});

export default function DemoScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <Image
          source={{
            uri: "https://plus.unsplash.com/premium_photo-1712501727396-f5abdbef9f38?q=80&w=2800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }}
          // loadingIndicatorSource={require("@/assets/splash.png")}
          defaultSource={require("@/assets/splash.png")}
          resizeMode="cover"
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT
          }}
        />
        <FloatingButton style={{ bottom: 100 }} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  }
});
