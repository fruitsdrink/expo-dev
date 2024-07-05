import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRef, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const HEIGHT_VISIBILIYT_THRESHOLD = 50;

const data: { id: number }[] = Array(10)
  .fill(0)
  .map((_, i) => ({
    id: i
  }));

export default function DemoScreen() {
  const insets = useSafeAreaInsets();
  const [headerHeight, setHeaderHeight] = useState(0);
  const top = useSharedValue(0);
  const scrollYRef = useRef(0);

  const headerStyle = useAnimatedStyle(() => {
    return {
      top: top.value
    };
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top
          }
        ]}
      >
        <StatusBar hidden />

        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={(e) => {
            const y = e.nativeEvent.contentOffset.y;
            const scrllingDown = y > scrollYRef.current;

            if (scrllingDown && y > HEIGHT_VISIBILIYT_THRESHOLD) {
              top.value = withSpring(-headerHeight, { damping: 16 });
            } else if (!scrllingDown && y < HEIGHT_VISIBILIYT_THRESHOLD) {
              top.value = withSpring(0, { damping: 16 });
            }
          }}
          contentContainerStyle={{
            padding: 16,
            rowGap: 16,
            paddingTop: headerHeight + 16,
            paddingBottom: insets.bottom + 16
          }}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "pink",
                  borderRadius: 8,
                  paddingVertical: 64
                }}
              >
                <Text>#{item.id}</Text>
              </View>
            );
          }}
        />

        <View
          style={{
            position: "absolute",
            top: insets.top,
            left: 0,
            right: 0
          }}
        >
          <View style={{ position: "relative" }}>
            <Animated.View
              onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
              style={[
                {
                  position: "absolute",
                  left: 0,
                  right: 0,
                  paddingVertical: 96,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "skyblue"
                },
                headerStyle
              ]}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Header</Text>
            </Animated.View>
          </View>
        </View>

        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: insets.top,
            backgroundColor: "white"
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
