import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ViewStyle,
  StyleProp,
  TextStyle
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { useCallback, useRef, useState } from "react";
import LottieView, { LottieViewProps } from "lottie-react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface AnimatedWrapperProps extends LottieViewProps {
  children: React.ReactNode;
  showAnimation?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  title?: string;
}
const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
  children,
  showAnimation,
  containerStyle,
  textStyle,
  title,
  style,
  ...lottieProps
}) => {
  if (!showAnimation) return <>{children}</>;

  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "30%"
        },
        containerStyle
      ]}
    >
      <LottieView
        style={[{ width: "80%", aspectRatio: 1 }, style]}
        autoPlay
        loop
        resizeMode="contain"
        {...lottieProps}
      />
      {title && (
        <Text style={[{ fontSize: 24, fontWeight: "300" }, textStyle]}>
          {title}
        </Text>
      )}
    </View>
  );
};

export default function DemoScreen() {
  const [items, setItems] = useState<number[]>([]);
  const buttonRef = useRef<LottieView>(null);

  const onDelete = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const onAdd = useCallback(() => {
    buttonRef.current.reset();
    buttonRef.current.play(0, 75);
    setItems((prev) => [...prev, prev.length]);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar hidden />

      <AnimatedWrapper
        source={require("@/assets/lottie/day80/astronaut.json")}
        showAnimation={items.length === 0}
        title="Add new items ➕"
      >
        <ScrollView style={styles.scrollView}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onDelete(index)}
              style={styles.itemContainer}
            >
              <View style={styles.item} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </AnimatedWrapper>
      <TouchableOpacity style={styles.floatingButton} onPress={onAdd}>
        <LottieView
          ref={buttonRef}
          source={require("@/assets/lottie/day80/add.json")}
          style={{ flex: 1 }}
          loop={false}
          autoPlay={false}
          speed={3}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const FLOATING_ACTION_BUTTON_SIZE = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.05)"
  },
  scrollView: {
    flex: 1
  },
  itemContainer: {
    height: 100,
    width: "100%",
    marginVertical: 10,
    alignItems: "center"
  },
  item: {
    flex: 1,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 20 },
    shadowRadius: 10,
    elevation: 5
  },
  floatingButton: {
    height: FLOATING_ACTION_BUTTON_SIZE,
    width: FLOATING_ACTION_BUTTON_SIZE,
    backgroundColor: "black",
    borderRadius: FLOATING_ACTION_BUTTON_SIZE / 2,
    shadowOpacity: 0.09,
    shadowOffset: { width: 0, height: 20 },
    shadowRadius: 10,
    elevation: 5,
    position: "absolute",
    bottom: 64,
    right: 32
  }
});
