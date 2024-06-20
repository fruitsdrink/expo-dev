import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  useWindowDimensions
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { useRef } from "react";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";
import Color from "color";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const options = [
  { label: "Charts", iconName: "barschart" },
  { label: "Book", iconName: "book" },
  { label: "Calendar", iconName: "calendar" },
  { label: "Camera", iconName: "camera" }
];
const header = {
  label: "Header",
  iconName: "ellipsis1"
};

interface DropdownProps {
  header: typeof header;
  options: typeof options;
}
const Dropdown: React.FC<DropdownProps> = ({ options, header }) => {
  const isExpanded = useSharedValue(false);
  const dropdownItems = [header, ...options];

  return (
    <>
      {dropdownItems.map((item, idx) => {
        return (
          <DropdownListItem
            key={idx}
            item={item}
            index={idx}
            dropdownItemsCount={dropdownItems.length}
            isExpanded={isExpanded}
          />
        );
      })}
    </>
  );
};

interface DropdownListItemProps {
  item: (typeof options)[0];
  index: number;
  dropdownItemsCount: number;
  isExpanded: SharedValue<boolean>;
}
const DropdownListItem: React.FC<DropdownListItemProps> = ({
  item,
  index,
  dropdownItemsCount,
  isExpanded
}) => {
  const { width: WindowWidth } = useWindowDimensions();
  const DropdownListItemHeight = 85;
  const Margin = 10;

  const fullDropdownHeight =
    dropdownItemsCount * (DropdownListItemHeight + Margin);

  const collapsedTop = fullDropdownHeight / 2 - DropdownListItemHeight;
  const expandedTop = (DropdownListItemHeight + Margin) * index;

  const expandedScale = 1;
  const collapsedScale = 1 - index * 0.08;

  const expandedBackgroundColor = "#444";
  const collapsedBackgroundColor = Color(expandedBackgroundColor)
    .lighten(index * 0.25)
    .hex();

  // @ts-ignore
  const rStyle = useAnimatedStyle(() => {
    return {
      top: withSpring(isExpanded.value ? expandedTop : collapsedTop),
      backgroundColor: withTiming(
        isExpanded.value ? expandedBackgroundColor : collapsedBackgroundColor
      ),
      transform: [
        {
          scale: withSpring(isExpanded.value ? expandedScale : collapsedScale)
        },
        {
          translateY: fullDropdownHeight / 2
        }
      ]
    };
  }, []);

  const isHeader = index === 0;

  const rLeftIconOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: isHeader ? 1 : withTiming(isExpanded.value ? 1 : 0)
    };
  }, []);

  const rHeaderArrowIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withTiming(isHeader && isExpanded.value ? "90deg" : "0deg")
        }
      ]
    };
  }, [isHeader]);

  return (
    <Animated.View
      onTouchEnd={() => {
        if (isHeader) isExpanded.value = !isExpanded.value;
      }}
      style={[
        {
          // zIndex: isHeader ? 1 : 0,
          zIndex: dropdownItemsCount - index,
          position: "absolute",
          width: WindowWidth * 0.9,
          height: DropdownListItemHeight,
          borderRadius: 8
        },
        rStyle
      ]}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Animated.View
          style={[
            {
              position: "absolute",
              width: 45,
              aspectRatio: 1,
              backgroundColor: "#333",
              borderRadius: 10,
              left: 15,
              justifyContent: "center",
              alignItems: "center"
            },
            rLeftIconOpacityStyle
          ]}
        >
          <AntDesign name={item.iconName as any} size={24} color={"#d4d4d4"} />
        </Animated.View>
        <Text
          style={{
            fontSize: 22,
            color: "#d4d4d4",
            textTransform: "uppercase",
            letterSpacing: 1.2,
            fontWeight: "500"
          }}
        >
          {item.label}
        </Text>
        <Animated.View
          style={[
            {
              position: "absolute",
              width: 45,
              aspectRatio: 1,
              borderRadius: 10,
              right: 15,
              justifyContent: "center",
              alignItems: "center"
            },
            rHeaderArrowIconStyle
          ]}
        >
          <MaterialIcons
            name={isHeader ? "arrow-forward-ios" : "arrow-forward"}
            size={24}
            color={"#d4d4d4"}
          />
        </Animated.View>
      </View>
    </Animated.View>
  );
};

export default function DemoScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar style="inverted" />
        <Dropdown header={header} options={options} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center"
  }
});
