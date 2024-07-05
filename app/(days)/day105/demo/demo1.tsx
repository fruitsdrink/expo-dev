import {
  Dimensions,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from "react-native-reanimated";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

export const items = [
  {
    title: "Upcoming Show Live from Paris",
    subtitle: "SPRING-SUMMER 2021",
    picture: require("@/assets/images/day105/chanel.jpg"),
    top: 0
  },
  {
    title: "In Boutiques",
    subtitle: "FALL-WINTER 2020/21",
    picture: require("@/assets/images/day105/sonnie-hiles-pU4J5VFnqCQ-unsplash-with-gradient.jpg"),
    top: 0
  },
  {
    title: "Deauville Film Festival",
    subtitle: "CHANEL IN CINEMA",
    picture: require("@/assets/images/day105/laura-chouette-NFrPPyGe5q0-unsplash-with-gradient.jpg"),
    top: 0
  },
  {
    title: "IN BOUTIQUES",
    subtitle: "Métiers d'art 2019/20",
    picture: require("@/assets/images/day105/butsarakham-buranaworachot-au6Gddf1pZQ-unsplash.jpg"),
    top: 0
  },
  {
    title: "Haute Couture",
    subtitle: "FALL-WINTER 2020/21",
    picture: require("@/assets/images/day105/khaled-ghareeb-upepKTbwm3A-unsplash.jpg"),
    top: 50
  },
  {
    title: "Balade en Méditerranée",
    subtitle: "CRUISE 2020/21",
    picture: require("@/assets/images/day105/christopher-campbell-A3QXXEfcA1U-unsplash.jpg"),
    top: 0
  },
  {
    title: "Spring-Summer 2020 Campaign",
    subtitle: "EYEWEAR",
    picture: require("@/assets/images/day105/chase-fade-Pb13EUxzMDw-unsplash.jpg"),
    top: 0
  }
];

const MIN_HEIGHT = 128;
const MAX_HEIGHT = height / 2;

type Item = {
  title: string;
  subtitle: string;
  picture: ImageSourcePropType;
  top: number;
};

type ItemProps = {
  index: number;
  y: SharedValue<number>;
  item: Item;
};
const Item = ({ item, y, index }: ItemProps) => {
  const inputRange = [(index - 1) * MAX_HEIGHT, index * MAX_HEIGHT];
  const style = useAnimatedStyle(() => {
    return {
      height: interpolate(
        y.value,
        inputRange,
        [MIN_HEIGHT, MAX_HEIGHT],
        Extrapolation.CLAMP
      )
    };
  });

  const titleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      y.value,
      inputRange,
      [0, 1],
      Extrapolation.CLAMP
    );
    return {
      opacity
    };
  });

  // const pictureStyle = useAnimatedStyle(() => {
  //   return {
  //     height: MAX_HEIGHT,
  //     top: interpolate(y.value, inputRange, [-item.top, 0])
  //   };
  // });

  return (
    <TouchableWithoutFeedback onPress={() => {}}>
      <Animated.View style={[itemStyles.container, style]}>
        <Animated.Image source={item.picture} style={[itemStyles.picture]} />
        <View style={itemStyles.titleContainer}>
          <Text style={itemStyles.subtitle}>{item.subtitle.toUpperCase()}</Text>
          <View style={itemStyles.mainTitle}>
            <Animated.View style={titleStyle}>
              <Text style={itemStyles.title}>{item.title.toUpperCase()}</Text>
            </Animated.View>
          </View>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const itemStyles = StyleSheet.create({
  container: {
    width,
    height: MIN_HEIGHT,
    justifyContent: "flex-end"
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined
  },
  title: {
    color: "white",
    textAlign: "center",
    fontSize: 32,
    fontWeight: "500"
  },
  titleContainer: {
    maxHeight: MAX_HEIGHT * 0.61,
    justifyContent: "center",
    flex: 1
  },
  mainTitle: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    padding: 32,
    transform: [{ translateY: 64 }]
  },
  subtitle: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold"
  }
});

export default function DemoScreen() {
  const y = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y: value } }) => {
      y.value = value;
    }
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Animated.ScrollView
        scrollEventThrottle={16}
        style={styles.scrollView}
        onScroll={onScroll}
        contentContainerStyle={{
          height: (items.length + 1) * MAX_HEIGHT
        }}
        snapToInterval={MAX_HEIGHT}
        decelerationRate={"fast"}
      >
        <StatusBar hidden />
        {items.map((item, index) => (
          <Item item={item} y={y} index={index} key={index} />
        ))}
      </Animated.ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "black"
  }
});
