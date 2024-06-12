import {
  Dimensions,
  StyleSheet,
  View,
  Animated,
  Image,
  Text,
  TextStyle,
  ViewStyle,
  Alert
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import React, { useRef } from "react";
import Constants from "expo-constants";

const { width, height } = Dimensions.get("screen");

type TextAnimationProps = {
  content: string;
  textStyle: TextStyle;
  style: ViewStyle;
  duration: number;
  staggerTime: number;
  // 是否反向消失
  isReverseHidden: boolean;
  // 间隔时间（毫秒）
  timeOut?: number;
  callBackFn?: () => void;
};
const TextAnimator: React.FC<TextAnimationProps> = ({
  content,
  textStyle,
  style,
  duration,
  staggerTime,
  timeOut,
  isReverseHidden,
  callBackFn
}) => {
  const [words, setWords] = React.useState<string[]>([]);
  const [animatedValues, setAnimatedValues] = React.useState<Animated.Value[]>(
    []
  );
  let timer = null;

  const styles = StyleSheet.create({
    textWrapper: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center"
    }
  });

  const animated = React.useCallback(
    (toValue = 1) => {
      // 创建一系列动画
      const animations = words.map((_, index) => {
        return Animated.timing(animatedValues[index], {
          toValue,
          duration,
          useNativeDriver: true
        });
      });

      // 串行执行动画

      console.log("🚀 ~ 串行执行动画:", animatedValues);

      Animated.stagger(
        staggerTime,
        isReverseHidden
          ? toValue === 0
            ? animations.reverse()
            : animations
          : animations
      ).start(({ finished }) => {
        console.log("🚀 ~ stager ~ start call callback fn");
        if (timer) {
          clearTimeout(timer);
        }

        if (finished) {
          timer = setTimeout(
            () => animated(toValue === 0 ? 1 : 0),
            timeOut ?? 1000
          );
          console.log("🚀 ~ stagger ~ finished", finished);
          if (callBackFn) {
            callBackFn();
          }
          // Alert.alert("Animation Finished");
        }
      });
    },
    [words, animatedValues]
  );

  React.useEffect(() => {
    console.log("🔥 setWords");
    setWords(content.trim().split(" "));
  }, [content]);

  React.useEffect(() => {
    console.log("🔥 setAnimatedValues");
    const newAnimatedValues = words.map((_, index) => new Animated.Value(0));
    setAnimatedValues(newAnimatedValues);
  }, [words]);

  React.useEffect(() => {
    if (words.length && animatedValues.length) {
      console.log("🔥 call animated fn");
      animated(1);
    }
  }, [words, animatedValues]);

  return (
    <View style={[style, styles.textWrapper]}>
      {words.map((word, index) => {
        if (!animatedValues.length || !words.length) {
          return null;
        }
        return (
          <Animated.Text
            key={`${word}-${index}`}
            style={[
              textStyle,
              {
                opacity: animatedValues[index],
                transform: [
                  {
                    translateY: Animated.multiply(
                      animatedValues[index],
                      new Animated.Value(-10)
                    )
                  }
                ]
              }
            ]}
          >
            {word}
            {`${index < words.length ? " " : ""}`}
          </Animated.Text>
        );
      })}
    </View>
  );
};

export default function DemoScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <TextAnimator
          content="For the things we have to learn before we can do them, we learn by doing them. REACT NATIVE 🥰"
          textStyle={styles.textStyle}
          style={styles.containerStyle}
          duration={500}
          staggerTime={500}
          isReverseHidden={true}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    paddingTop: Constants.statusBarHeight,
    padding: 8
  },
  containerStyle: {},
  textStyle: {
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "Menlo",
    marginBottom: 14
  }
});
