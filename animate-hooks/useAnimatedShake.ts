import React from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming
} from "react-native-reanimated";

type Props = {
  /** 晃动幅度，默认20 */
  dx?: number;
  /** 持续时间，默认80ms */
  duration?: number;
  /** 晃动次数，默认3次 */
  repeat?: number;
};

/**
 * 晃动动画
 * @param options
 * @returns { shake, shakeStyle, isShaking }
 * 
 * @example
  const { shake, shakeStyle, isShaking } = useAnimatedShake();

   const errorStyle = useAnimatedStyle(() => {
    return {
      color: isShaking.value ? "red" : "#333"
    };
  });

  return (
    <>
      <View style={styles.container}>
        <Animated.Text style={[errorStyle, shakeStyle]}>100</Animated.Text>
        <TouchableOpacity
          style={styles.button}
          onPress={shake}
        >
          <Text>Click me</Text>
        </TouchableOpacity>
      </View>
    </>
  );
 */
export const useAnimatedShake = (options?: Props) => {
  options = options ?? { dx: 20, duration: 80 };
  options.dx = options.dx ?? 20;
  options.duration = options.duration ?? 80;
  options.repeat = options.repeat ?? 3;

  const shakeTranslateX = useSharedValue(0);

  const shake = React.useCallback(() => {
    const dx = options.dx;
    const timingConfig = {
      duration: options.duration,
      easing: Easing.bezier(0.35, 0.7, 0.5, 0.7)
    };

    shakeTranslateX.value = withSequence(
      withTiming(dx, timingConfig),
      withRepeat(withTiming(-dx, timingConfig), options.repeat, true),
      withSpring(0, { mass: 0.5 })
    );
  }, []);

  const shakeStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: shakeTranslateX.value
        }
      ]
    };
  }, []);

  const isShaking = useDerivedValue(() => {
    return shakeTranslateX.value !== 0;
  });

  return { shake, shakeStyle, isShaking };
};
