import {
  Animated,
  Dimensions,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import Svg, { Polygon } from "react-native-svg";
import MaskedView from "@react-native-masked-view/masked-view";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const routes = [
  "Get started",
  "Features",
  "Tools",
  "Services",
  "Portfolio",
  "Careers",
  "Contact"
];
const links = ["Follow us", "Quota", "Awesome link"];
const colors = [
  "#69d2e7",
  "#a7dbd8",
  "#e0e4cc",
  "#f38630",
  "#fa6900",
  "#fe4365",
  "#fc9d9a",
  "#f9cdad",
  "#c8c8a9",
  "#83af9b",
  "#ecd078",
  "#d95b43",
  "#c02942",
  "#53777a"
];

// 按钮组件
type ButtonProps = {
  label: string;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
};

const Button: React.FC<ButtonProps> = ({ label, style, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={style}>{label}</Text>
    </TouchableOpacity>
  );
};

const fromCoords = { x: 0, y: SCREEN_HEIGHT };
const toCoords = { x: SCREEN_WIDTH, y: 0 };

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);
const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign);

// Drawer组件
type CustomerDrawerProps = {
  onPress?: () => void;
  animatedValue: Animated.ValueXY;
};
const CustomerDrawer: React.FC<CustomerDrawerProps> = ({
  onPress,
  animatedValue
}) => {
  const [selectedRoute, setSelectedRoute] = useState(routes[0]);
  const polygonRef = useRef<Polygon>(null);

  useEffect(() => {
    animatedValue.addListener((v) => {
      if (polygonRef.current) {
        polygonRef.current.setNativeProps({
          points: `0, 0 ${v.x},${v.y} ${SCREEN_WIDTH}, ${SCREEN_HEIGHT} 0, ${SCREEN_HEIGHT}`
        });
      }
    });
  }, []);

  const translateX = animatedValue.x.interpolate({
    inputRange: [0, SCREEN_WIDTH],
    outputRange: [-100, 0]
  });
  const opacity = animatedValue.x.interpolate({
    inputRange: [0, SCREEN_WIDTH],
    outputRange: [0, 1]
  });

  return (
    <MaskedView
      style={{ flex: 1 }}
      maskElement={
        <Svg
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
          viewBox={`0 0 ${SCREEN_WIDTH} ${SCREEN_HEIGHT}`}
          style={{ backgroundColor: "transparent" }}
        >
          <AnimatedPolygon
            ref={polygonRef}
            // fill={"green"}
            points={`0, 0 ${fromCoords.x},${fromCoords.y} ${SCREEN_WIDTH}, ${SCREEN_HEIGHT} 0, ${SCREEN_HEIGHT}`}
            // points={`100 100, 200 100, 200 200`}
          />
        </Svg>
      }
    >
      <View style={customerDrawerStyle.container}>
        {/* 关闭按钮 */}
        <AntDesign
          name="close"
          size={24}
          color="white"
          onPress={onPress}
          style={{
            position: "absolute",
            top: 40,
            right: 20
          }}
        />
        {/* 菜单 */}
        <Animated.View
          style={[
            customerDrawerStyle.menu,
            {
              opacity,
              transform: [{ translateX }]
            }
          ]}
        >
          <View>
            {routes.map((route, index) => {
              return (
                <Button
                  label={route}
                  key={route}
                  onPress={() => {
                    setSelectedRoute(route);
                    onPress();
                  }}
                  style={[
                    customerDrawerStyle.button,
                    {
                      color: colors[index],
                      textDecorationLine:
                        selectedRoute === route ? "line-through" : "none"
                    }
                  ]}
                />
              );
            })}
          </View>
          <View>
            {links.map((link, index) => {
              return (
                <Button
                  label={link}
                  key={link}
                  onPress={onPress}
                  style={[
                    customerDrawerStyle.buttonSmall,
                    { color: colors[index + routes.length + 1] }
                  ]}
                />
              );
            })}
          </View>
        </Animated.View>
      </View>
    </MaskedView>
  );
};

const customerDrawerStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  menu: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  button: {
    fontSize: 32,
    color: "#fdfdfd",
    lineHeight: 32 * 1.5
  },
  buttonSmall: {
    fontSize: 16,
    marginBottom: 5,
    color: "#fdfdfd"
  }
});

export default function DemoScreen() {
  const animatedValue = useRef(new Animated.ValueXY(fromCoords)).current;

  const animate = (type: "open" | "close") => {
    return Animated.timing(animatedValue, {
      toValue: type === "close" ? fromCoords : toCoords,
      duration: 500,
      useNativeDriver: true
    });
  };

  const onCloseDrawer = useCallback(() => {
    animate("close").start(() => {});
  }, []);

  const onOpenDrawer = useCallback(() => {
    animate("open").start(() => {});
  }, []);

  const translateX = animatedValue.y.interpolate({
    inputRange: [0, SCREEN_HEIGHT * 0.3],
    outputRange: [100, 0],
    extrapolate: "clamp"
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <CustomerDrawer onPress={onCloseDrawer} animatedValue={animatedValue} />
        <AnimatedAntDesign
          name="menuunfold"
          size={24}
          color={"#222"}
          onPress={onOpenDrawer}
          style={{
            position: "absolute",
            top: 40,
            right: 20,

            transform: [{ translateX }]
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
