import {
  Dimensions,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import { button } from "blessed";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const ButtonHeight = 60;
const Palette = {
  card: "#302e37",
  highlight: "#ea3f4c",
  background: "#18141d",
  text: "white"
};

type PressableScaleProps = {
  children?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const PressabelScale: React.FC<PressableScaleProps> = ({
  children,
  onPress,
  style
}) => {
  const scale = useSharedValue(1);

  const gesture = Gesture.Tap()
    .maxDuration(10000)
    .onTouchesDown(() => {
      scale.value = withTiming(0.9);
    })
    .onTouchesUp(() => {
      if (onPress) {
        runOnJS(onPress)();
      }
    })
    .onTouchesCancelled(() => {
      console.log("cannel");
    })
    .onFinalize(() => {
      scale.value = withTiming(1);
    });

  const rButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    };
  }, []);
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[style, rButtonStyle]}>{children}</Animated.View>
    </GestureDetector>
  );
};

type SplitAction = {
  label: string;
  onPress: () => void;
  backgroundColor: string;
};
type SplitButtonProps = {
  splitted: boolean;
  mainAction: SplitAction;
  leftAction: SplitAction;
  rightAction: SplitAction;
};
const SplitButton: React.FC<SplitButtonProps> = ({
  splitted,
  mainAction,
  leftAction,
  rightAction
}) => {
  const paddingHorizontal = 20;
  const gap = 10;
  const splittedButtonWidth = (SCREEN_WIDTH - paddingHorizontal * 2) / 2;

  const rLeftButtonStyle = useAnimatedStyle(() => {
    const leftButtonWidth = splitted ? splittedButtonWidth : 0;
    return {
      width: withTiming(leftButtonWidth),
      opacity: withTiming(splitted ? 1 : 0)
    };
  }, [splitted]);

  const rLeftTextStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(splitted ? 1 : 0, {
        duration: 150
      })
    };
  }, [splitted]);

  const rMainButtonStyle = useAnimatedStyle(() => {
    const mainButtonWidth = splitted
      ? splittedButtonWidth
      : splittedButtonWidth * 2;

    return {
      width: withTiming(mainButtonWidth),
      marginLeft: withTiming(splitted ? gap : 0),
      backgroundColor: withTiming(
        splitted ? rightAction.backgroundColor : mainAction.backgroundColor
      )
    };
  }, [splitted]);

  const rMainTextStle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(splitted ? 0 : 1)
    };
  }, [splitted]);

  const rRightTextStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(splitted ? 1 : 0)
    };
  }, [splitted]);

  return (
    <View
      style={{
        width: "100%",
        height: ButtonHeight,
        paddingHorizontal,
        flexDirection: "row"
      }}
    >
      <PressabelScale
        onPress={leftAction.onPress}
        style={[
          {
            backgroundColor: leftAction.backgroundColor
          },
          splitButtonStyles.button,
          rLeftButtonStyle
        ]}
      >
        <Animated.Text
          numberOfLines={1}
          style={[splitButtonStyles.label, rLeftTextStyle]}
        >
          {leftAction.label}
        </Animated.Text>
      </PressabelScale>

      <PressabelScale
        onPress={splitted ? rightAction.onPress : mainAction.onPress}
        style={[splitButtonStyles.button, rMainButtonStyle]}
      >
        <Animated.Text style={[splitButtonStyles.label, rMainTextStle]}>
          {mainAction.label}
        </Animated.Text>
        <Animated.Text style={[splitButtonStyles.label, rRightTextStyle]}>
          {rightAction.label}
        </Animated.Text>
      </PressabelScale>
    </View>
  );
};

const splitButtonStyles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: Palette.text,
    fontFamily: "FireCode-Regular",
    textTransform: "lowercase",
    position: "absolute"
  },
  button: {
    height: ButtonHeight,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: ButtonHeight / 2,
    borderCurve: "continuous"
  }
});

export default function DemoScreen() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [splitted, setSplitted] = useState(false);

  useEffect(() => {
    (() => {
      Font.loadAsync({
        "FireCode-Regular": require("@/assets/fonts/FiraCode-Regular.ttf")
      }).then(() => {
        setFontLoaded(true);
      });
    })();
  }, []);

  if (!fontLoaded) return null;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar style="light" />
        <SplitButton
          splitted={splitted}
          mainAction={{
            label: "Stop",
            backgroundColor: Palette.card,
            onPress: () => {
              console.log("stop");
              setSplitted(true);
            }
          }}
          leftAction={{
            label: "Resume",
            backgroundColor: Palette.card,
            onPress: () => {
              console.log("resume");
              setSplitted(false);
            }
          }}
          rightAction={{
            label: "Finish",
            backgroundColor: Palette.highlight,
            onPress: () => {
              console.log("finish");
              setSplitted(false);
            }
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
    alignItems: "center",
    justifyContent: "center"
  }
});
