import { Stack } from "expo-router";
import { View, StyleSheet, Pressable, Text } from "react-native";
import React, { useMemo, useState } from "react";
import { type MotiTransitionProp, MotiView } from "moti";
import { StatusBar } from "expo-status-bar";
import { Easing } from "react-native-reanimated";

const _colors = {
  active: "#2c2c2c",
  inactive: "#dcdcdc"
};

type Props = {
  size: number;
  onPress: () => void;
  isAcitive: boolean;
};

const Switch: React.FC<Props> = ({ size, onPress, isAcitive }) => {
  const trackWidth = useMemo(() => size * 1.5, [size]);
  const trackHeight = useMemo(() => size * 0.4, [size]);
  const knobSize = useMemo(() => size * 0.6, [size]);

  const transition: MotiTransitionProp = {
    type: "timing",
    duration: 300,
    easing: Easing.inOut(Easing.ease)
  };

  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {/* track */}
        <MotiView
          transition={transition}
          animate={{
            backgroundColor: isAcitive ? _colors.active : _colors.inactive
          }}
          style={{
            position: "absolute",
            width: trackWidth,
            height: trackHeight,
            borderRadius: trackHeight / 2,
            backgroundColor: _colors.active
          }}
        />
        {/* knob container */}
        <MotiView
          transition={transition}
          animate={{
            translateX: isAcitive ? trackWidth / 4 : -trackWidth / 4
          }}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {/* knob */}
          <MotiView
            transition={transition}
            animate={{
              width: isAcitive ? 0 : knobSize,
              borderColor: isAcitive ? _colors.active : _colors.inactive
            }}
            style={{
              width: knobSize,
              height: knobSize,
              borderRadius: knobSize / 2,
              borderWidth: size * 0.1,
              borderColor: _colors.active
            }}
          />
        </MotiView>
      </View>
    </Pressable>
  );
};

export default function DemoScreen() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Switch
          size={60}
          isAcitive={isActive}
          onPress={() => {
            setIsActive((isActive) => !isActive);
          }}
        />
      </View>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#efefef"
  }
});
