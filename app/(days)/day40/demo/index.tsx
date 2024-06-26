import {
  Dimensions,
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  Vibration
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { TextInput } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");

const colors = {
  black: "#323F4E",
  red: "#F76A6A",
  text: "#ffffff"
};

const timers = [...Array(13).keys()].map((i) => (i === 0 ? 1 : i * 5));
const ITEM_SIZE = width * 0.38;
const ITEM_SPACING = (width - ITEM_SIZE) / 2;

export default function Day40DemoScreen() {
  const inputRef = useRef<TextInput>();
  const scrollX = useRef(new Animated.Value(0)).current;
  const timerAnimation = useRef(new Animated.Value(height)).current;
  const textInputAnimation = useRef(new Animated.Value(timers[0])).current;
  const buttonAnimation = useRef(new Animated.Value(0)).current;
  const [duration, setDuration] = useState(timers[0]);

  const animation = useCallback(() => {
    textInputAnimation.setValue(duration);

    Animated.sequence([
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }),
      Animated.timing(timerAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }),
      Animated.parallel([
        Animated.timing(timerAnimation, {
          toValue: height,
          duration: duration * 1000,
          useNativeDriver: true
        }),
        Animated.timing(textInputAnimation, {
          toValue: 0,
          duration: duration * 1000,
          useNativeDriver: true
        })
      ])
      // Animated.delay(400)
    ]).start(() => {
      Vibration.cancel(); // 取消震动
      Vibration.vibrate(); // 震动

      textInputAnimation.setValue(duration); // 目的是避免动画结束后显示数字0,但因上面delay(400)会导致显示0

      Animated.sequence([
        Animated.delay(400),
        Animated.timing(buttonAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        })
      ]).start();
    });
  }, [duration]);

  const opacity = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0]
  });

  const translateY = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200]
  });

  const textOpacity = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  useEffect(() => {
    const listener = textInputAnimation.addListener(({ value }) => {
      inputRef?.current?.setNativeProps({
        text: Math.ceil(value).toString()
      });
    });

    return () => {
      textInputAnimation.removeListener(listener);
      textInputAnimation.removeAllListeners();
    };
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            {
              width,
              height,
              backgroundColor: colors.red,
              transform: [
                {
                  translateY: timerAnimation
                }
              ]
            }
          ]}
        />
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            {
              justifyContent: "flex-end",
              alignItems: "center",
              paddingBottom: 100,
              opacity,
              transform: [
                {
                  translateY
                }
              ]
            }
          ]}
        >
          <TouchableOpacity onPress={animation}>
            <View style={styles.roundButton} />
          </TouchableOpacity>
        </Animated.View>
        <View
          style={{
            position: "absolute",
            top: height / 3,
            left: 0,
            right: 0,
            flex: 1
          }}
        >
          <Animated.View
            style={{
              position: "absolute",
              width: ITEM_SIZE,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              opacity: textOpacity
            }}
          >
            <TextInput
              ref={inputRef}
              style={styles.text}
              defaultValue={duration.toString()}
            />
          </Animated.View>
          <Animated.FlatList
            data={timers}
            keyExtractor={(item) => item.toString()}
            horizontal
            bounces={false}
            showsHorizontalScrollIndicator={false}
            snapToInterval={ITEM_SIZE}
            decelerationRate={"fast"}
            contentContainerStyle={{
              paddingHorizontal: ITEM_SPACING
            }}
            style={{
              flexGrow: 0,
              opacity
            }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            onMomentumScrollEnd={(ev) => {
              const index = Math.round(
                ev.nativeEvent.contentOffset.x / ITEM_SIZE
              );
              setDuration(timers[index]);
            }}
            renderItem={({ item, index }) => {
              const inputRange = [
                (index - 1) * ITEM_SIZE,
                index * ITEM_SIZE,
                (index + 1) * ITEM_SIZE
              ];

              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.4, 1, 0.4]
              });

              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.7, 1, 0.7]
              });

              return (
                <View
                  style={{
                    width: ITEM_SIZE,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Animated.Text
                    style={[styles.text, { opacity, transform: [{ scale }] }]}
                  >
                    {item}
                  </Animated.Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black
  },
  roundButton: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: colors.red
  },
  text: {
    fontSize: ITEM_SIZE * 0.8,
    fontFamily: "Menlo",
    color: colors.text,
    fontWeight: "900"
  }
});
