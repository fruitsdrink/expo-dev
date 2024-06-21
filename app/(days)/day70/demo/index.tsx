import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import * as Font from "expo-font";
// @ts-ignore
import sfCompactRoundedMedium from "@/assets/fonts/SF-Compact-Rounded-Medium.otf";
import React, { useEffect, useState } from "react";
import Animated, {
  useAnimatedStyle,
  withTiming
} from "react-native-reanimated";

const Palette = {
  baseGray05: "#e5e2dc",
  baseGray80: "#30302e",
  background: "#f1eee8"
};

type SegmentedControlProps = {
  options: string[];
  selectedOption: string;
  onOptionPress?: (option: string) => void;
};

const SegmentedControl: React.FC<SegmentedControlProps> = React.memo(
  ({ options, selectedOption, onOptionPress }) => {
    const { width: windowWidth } = useWindowDimensions();
    const internalPadding = 20;
    const segmentedControlWidth = windowWidth - 40;
    const itemWidth =
      (segmentedControlWidth - internalPadding) / options.length;

    const rStyle = useAnimatedStyle(() => {
      return {
        left: withTiming(
          itemWidth * options.indexOf(selectedOption) + internalPadding / 2
        )
      };
    }, [selectedOption, options, itemWidth]);
    return (
      <View
        style={[
          segmentedControlStyles.contianer,
          {
            width: segmentedControlWidth,
            borderRadius: 20,
            paddingLeft: internalPadding / 2
          }
        ]}
      >
        <Animated.View
          style={[
            {
              width: itemWidth
            },
            segmentedControlStyles.activeBox,
            rStyle
          ]}
        />
        {options.map((option) => {
          return (
            <TouchableOpacity
              key={option}
              onPress={() => onOptionPress?.(option)}
              style={[
                {
                  width: itemWidth
                },
                segmentedControlStyles.labelContainer
              ]}
            >
              <Text style={segmentedControlStyles.label}>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
);

const segmentedControlStyles = StyleSheet.create({
  contianer: {
    flexDirection: "row",
    height: 50,
    backgroundColor: Palette.baseGray05
  },
  activeBox: {
    position: "absolute",
    height: "80%",
    top: "10%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.1,
    elevation: 3,
    backgroundColor: Palette.background
  },
  labelContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  label: {
    fontFamily: "SF-Compact-Rounded-Medium",
    fontSize: 16
  }
});

const options = ["Light", "Standed", "Pro"];
export default function DemoScreen() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Standed");

  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        "SF-Compact-Rounded-Medium": sfCompactRoundedMedium // medium
      });

      setFontLoaded(true);
    })();
  }, []);
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        {fontLoaded && (
          <SegmentedControl
            options={options}
            selectedOption={selectedOption}
            onOptionPress={setSelectedOption}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
    // backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center"
  }
});
