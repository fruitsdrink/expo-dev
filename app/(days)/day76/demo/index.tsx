import {
  Dimensions,
  StyleSheet,
  View,
  useWindowDimensions
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import {
  Blur,
  Canvas,
  Circle,
  ColorMatrix,
  Group,
  Paint,
  SweepGradient,
  vec
} from "@shopify/react-native-skia";
import Touchable, { useGestureHandler } from "react-native-skia-gesture";
import { useSharedValue, withSpring } from "react-native-reanimated";
import { useMemo } from "react";

const RADIIUS = 80;
export default function DemoScreen() {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const cx = useSharedValue(windowWidth / 2);
  const cy = useSharedValue(windowHeight / 2);
  const context = useSharedValue({ x: 0, y: 0 });

  const gestureHandler = useGestureHandler({
    onStart: () => {
      "worklet";

      context.value = {
        x: cx.value,
        y: cy.value
      };
    },
    onActive: ({ translationX, translationY }) => {
      "worklet";

      cx.value = translationX + context.value.x;
      cy.value = translationY + context.value.y;
    },
    onEnd: () => {
      cx.value = withSpring(windowWidth / 2);
      cy.value = withSpring(windowHeight / 2);
    }
  });

  const layer = useMemo(() => {
    return (
      <Paint>
        {/* pixelOpacity > blurredOpacity * 60 -30 */}
        <Blur blur={30} />
        <ColorMatrix
          matrix={[
            // R,G,B,A, Bias (offset)
            // prettier-ignore
            1, 0, 0, 0, 0,
            // prettier-ignore
            0, 1, 0, 0, 0,
            // prettier-ignore
            0, 0, 1, 0, 0,
            // prettier-ignore
            0, 0, 0, 60, -30
          ]}
        />
      </Paint>
    );
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: true }} />
      <StatusBar style="light" />
      <Touchable.Canvas style={styles.container}>
        <Group layer={layer}>
          <Touchable.Circle {...gestureHandler} cx={cx} cy={cy} r={RADIIUS} />
          <Circle cx={windowWidth / 2} cy={windowHeight / 2} r={RADIIUS} />
          <SweepGradient c={vec(0, 0)} colors={["cyan", "magenta", "cyan"]} />
        </Group>
      </Touchable.Canvas>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333"
  }
});
