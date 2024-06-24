import {
  BottomTabBarProps,
  BottomTabNavigationOptions
} from "@react-navigation/bottom-tabs";
import { Tabs, router } from "expo-router";
import {
  ColorValue,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign, Feather } from "@expo/vector-icons";
import React, { useEffect } from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated";
import { scale } from "@shopify/react-native-skia";

type TabBarItemProps = {
  isFocused: boolean;
  label: string;
  style?: StyleProp<ViewStyle>;
  routeName: string;
  color: ColorValue;
  icon: React.ReactNode;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  onLongPress?: ((event: GestureResponderEvent) => void) | undefined;
};
const TabBarItem: React.FC<TabBarItemProps> = ({
  isFocused,
  label,
  style,
  routeName,
  color,
  icon,
  onPress,
  onLongPress
}) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      {
        duration: 350
      }
    );
  }, [isFocused]);

  const rIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(progress.value, [0, 1], [1, 1.4]);
    const top = interpolate(progress.value, [0, 1], [0, 8]);

    return {
      transform: [{ scale: scaleValue }],
      top
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 1], [1, 0]);

    return {
      opacity
    };
  });

  return (
    <TouchableOpacity
      // accessibilityRole="button"
      // accessibilityState={isFocused ? { selected: true } : {}}
      // accessibilityLabel={options.tabBarAccessibilityLabel}
      // testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={style}
    >
      <Animated.View style={rIconStyle}>{icon}</Animated.View>
      <Animated.Text
        style={[
          {
            color,
            fontSize: 11
          },
          rTextStyle
        ]}
      >
        {label}
      </Animated.Text>
    </TouchableOpacity>
  );
};

interface TabBarProps extends BottomTabBarProps {}
const TabBar: React.FC<TabBarProps> = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  const primaryColor = "#0891b2";
  const greyColor = "#737373";

  const icons = {
    "(tabs)/index": (props: { color: ColorValue }) => (
      <AntDesign name="home" size={24} color={greyColor} {...props} />
    ),
    "(tabs)/explore": (props: { color: ColorValue }) => (
      <Feather name="compass" size={24} color={greyColor} {...props} />
    ),
    "(tabs)/create": (props: { color: ColorValue }) => (
      <AntDesign name="pluscircleo" size={24} color={greyColor} {...props} />
    ),
    "(tabs)/profile": (props: { color: ColorValue }) => (
      <AntDesign name="user" size={24} color={greyColor} {...props} />
    )
  };

  return (
    <View style={[tabBarStyles.container, { bottom: insets.bottom }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title ?? route.name;

        if (
          [
            "_sitemap",
            "+not-found",
            "(tabs)/_sitemap",
            "(tabs)/+not-found"
          ].includes(route.name)
        )
          return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key
          });
        };
        const icon = icons[route.name]({
          color: isFocused ? primaryColor : greyColor
        });

        return (
          <TabBarItem
            key={route.key}
            isFocused={isFocused}
            label={label}
            icon={icon}
            routeName={route.name}
            style={tabBarStyles.item}
            color={isFocused ? primaryColor : greyColor}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        );
      })}
    </View>
  );
};

const tabBarStyles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    borderCurve: "continuous",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 5
  },
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 4
  }
});

export default function DemoLayout() {
  return (
    <>
      <Tabs tabBar={(props) => <TabBar {...props} />}>
        <Tabs.Screen name="(tabs)/index" options={{ title: "首页" }} />
        <Tabs.Screen name="(tabs)/explore" options={{ title: "发现" }} />
        <Tabs.Screen name="(tabs)/create" options={{ title: "发布" }} />
        <Tabs.Screen name="(tabs)/profile" options={{ title: "我的" }} />
      </Tabs>
    </>
  );
}
