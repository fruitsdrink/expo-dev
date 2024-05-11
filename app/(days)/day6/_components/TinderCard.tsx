import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const { width: screenWidth } = Dimensions.get("screen");
const tinderCardWidth = screenWidth * 0.8;

interface Props {
  user: {
    id: number;
    image: string;
    name: string;
  };
  numOfCards: number;
  index: number;
  activeIndex: SharedValue<number>;
  onResponse: (res: boolean) => void;
}
export const TinderCard: React.FC<Props> = ({
  user,
  numOfCards,
  index,
  activeIndex,
  onResponse,
}) => {
  const transaltionX = useSharedValue(0);

  // useDerivedValue(() => {
  //   activeIndex.value = interpolate(
  //     Math.abs(transaltionX.value),
  //     [0, 500],
  //     [0, activeIndex.value + 1]
  //   );
  // });

  const gesture = Gesture.Pan()
    // .enabled(activeIndex.value !== index)
    // .onBegin((event) => console.log("onBegin"))
    // .onStart((event) => console.log("onStart"))
    // .onUpdate((event) => console.log("onUpdate"))
    .onChange((event) => {
      transaltionX.value = event.translationX;

      activeIndex.value = interpolate(
        Math.abs(transaltionX.value),
        [0, 500],
        [index, index + 0.8]
      );
    })
    .onEnd((event) => {
      if (Math.abs(event.velocityX) > 400) {
        // transaltionX.value = withDecay({ velocity: event.velocityX });
        transaltionX.value = withSpring(Math.sign(event.velocityX) * 500, {
          velocity: event.velocityX,
        });

        // activeIndex.value = withSpring(activeIndex.value + 1);
        activeIndex.value = withSpring(index + 1);

        runOnJS(onResponse)(event.velocityX > 0);
      } else {
        transaltionX.value = withSpring(0);
      }
    });
  // .onFinalize((event) => console.log("onFinalize"));

  const animatedCard = useAnimatedStyle(() => {
    const style = {
      opacity: interpolate(
        activeIndex.value,
        [index - 1, index, index + 1],
        [1 - 1 / 5, 1, 1]
      ),
      transform: [
        {
          scale: interpolate(
            activeIndex.value,
            [index - 1, index, index + 1],
            [0.95, 1, 1]
          ),
        },
        {
          translateY: interpolate(
            activeIndex.value,
            [index - 1, index, index + 1],
            [-30, 0, 0]
          ),
        },
        {
          // translateX: activeIndex.value === index ? transaltionX.value : 0,
          translateX: transaltionX.value,
        },
        {
          rotateZ: `${interpolate(
            transaltionX.value,
            [-screenWidth / 2, 0, screenWidth / 2],
            [-15, 0, 15]
          )}deg`,
        },
      ],
    };
    // console.log(style);
    return style;
  });

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
        }}
      />

      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.card,
            animatedCard,
            {
              zIndex: numOfCards - index,
              // opacity: 1 - curIndex * 0.2,
              // transform: [
              // {
              //   scale: 1 - index * 0.05,
              // },
              // {
              //   translateY: -index * 30,
              // },
              // ],
            },
          ]}
        >
          <Image
            source={{
              uri: user.image,
            }}
            style={[StyleSheet.absoluteFillObject, styles.image]}
          />
          <LinearGradient
            // Background Linear Gradient
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            style={[StyleSheet.absoluteFillObject, styles.overlay]}
          />

          <View style={styles.footer}>
            <Text style={styles.name}>{user.name}</Text>
          </View>
        </Animated.View>
      </GestureDetector>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: tinderCardWidth,
    // height: tinderCardWidth * 1.67,
    aspectRatio: 1 / 1.67,
    borderRadius: 15,

    position: "absolute",

    justifyContent: "flex-end",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image: {
    borderRadius: 15,
  },
  overlay: {
    top: "50%",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  footer: {
    padding: 10,
  },
  name: {
    fontSize: 24,
    color: "white",
  },
});
