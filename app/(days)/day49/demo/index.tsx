import {
  Animated as RnAnimated,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  FlatList
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import React from "react";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withDelay,
  withSpring,
  withTiming
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView
} from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");
const tarodCardImg =
  "https://img.freepik.com/free-vector/hand-drawn-celestial-pattern-design_23-2151197686.jpg?t=st=1718449280~exp=1718452880~hmac=008ea3bfff1a6735e32ce9eae82ddef037a06b56da5b4c289ee15053ad97839d&w=1480";

const numberOfCards = 40;
const _size = 100;
const _cardSize = {
  width: _size,
  height: _size * 1.67,
  borderRadius: 12
};

// 2 * Math.Pi * R = cardSize * numberOfCards ;
// R = cardSize * numberOfCards / (2 * Math.Pi)
const TWO_PI = Math.PI * 2;
// each card is 12 degrees apart
const theta = TWO_PI / numberOfCards;
const cardVisibilityPercentage = 0.7;
const cardSize = _cardSize.width * cardVisibilityPercentage;
const circleRadius = Math.max((cardSize * numberOfCards) / TWO_PI, width);
const circleCircumference = TWO_PI * circleRadius;
const changeFactor = circleCircumference / width;

// 计算每个卡片的坐标
const cardCoordinates = (index: number) => {
  return {
    x: Math.cos(index * theta) * circleRadius,
    y: Math.sin(index * theta) * circleRadius
  };
};

type Card = {
  key: string;
  uri: string;
};

const cards: Card[] = [...Array(numberOfCards).keys()].map((i) => {
  return {
    key: `card=${i}`,
    uri: tarodCardImg
  };
});

type TarotWheelProps = {
  cards: Card[];
  onIndexChagnge: (index: number) => void;
};
const TarotWheel: React.FC<TarotWheelProps> = ({ cards, onIndexChagnge }) => {
  const distance = useSharedValue(0);
  const angle = useDerivedValue(() => {
    return distance.value / circleCircumference;
  });
  const interpolatedIndex = useDerivedValue(() => {
    const floatIndex = Math.abs((angle.value % TWO_PI) / theta);
    return angle.value < 0 ? floatIndex : numberOfCards - floatIndex;
  });
  const activeIndex = useDerivedValue(() => {
    return Math.round(interpolatedIndex.value);
  });

  const gesture = Gesture.Pan()
    .onChange((ev) => {
      distance.value += ev.changeX * changeFactor;
    })
    .onFinalize((ev) => {
      distance.value = withDecay(
        {
          // velocity的意思是衰减速度,为0则不会有动画效果，马上停止
          // velocity的单位是每秒多少像素
          velocity: ev.velocityX * changeFactor,
          // 衰减速度的因子，越大衰减越快
          velocityFactor: changeFactor
        },
        () => {
          const newFloatAngle = -interpolatedIndex.value * theta;
          const newAngle = -activeIndex.value * theta;

          distance.value = newFloatAngle * circleCircumference;
          // withSpring的动画效果是一个弹簧效果
          distance.value = withSpring(newAngle * circleCircumference);
          runOnJS(onIndexChagnge)(activeIndex.value);
        }
      );
    });

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${angle.value}rad`
        }
      ]
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          {
            width: circleRadius * 2,
            height: circleRadius * 2,
            borderRadius: circleRadius,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            position: "absolute",
            top: height - _cardSize.height * 1.5
          },
          stylez
        ]}
      >
        {cards.map((card, index) => {
          return (
            <TarotCard
              key={card.key}
              index={index}
              card={card}
              interpolatedIndex={interpolatedIndex}
            />
          );
        })}
      </Animated.View>
    </GestureDetector>
  );
};

type TarotCardProps = {
  index: number;
  card: Card;
  interpolatedIndex: SharedValue<number>;
};

const TarotCard: React.FC<TarotCardProps> = ({
  index,
  card,
  interpolatedIndex
}) => {
  const mounted = useSharedValue(0);

  React.useEffect(() => {
    mounted.value = withDelay(1000, withTiming(1, { duration: 2000 }));
  }, []);

  // @ts-ignore
  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        // {
        //   rotate: `${index * theta}rad`
        // },
        {
          rotate: `${interpolate(mounted.value, [0, 1], [0, theta * index])}rad`
        },
        {
          translateY: interpolate(
            interpolatedIndex.value,
            [index - 1, index, index + 1],
            [0, -_cardSize.height / 2, 0],
            Extrapolation.CLAMP
          )
        }
      ]
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: _cardSize.width,
          height: circleRadius * 2,
          // backgroundColor: "rgba(0,0,0,0.2)",
          position: "absolute"
          // transform: [
          //   {
          //     rotate: `${index * theta}rad`
          //   }
          // ]
        },
        stylez
      ]}
    >
      <Text>{index}</Text>
      <Image
        source={{
          uri: card.uri
        }}
        style={{
          width: _cardSize.width,
          height: _cardSize.height,
          borderRadius: _cardSize.borderRadius,
          borderWidth: 4,
          borderColor: "white"
        }}
      />
    </Animated.View>
  );
};

// const MyScrolling()=> {
//   const scrollY = useSharedValue(0)
//   const onScroll = useAnimatedScrollHandler({
//     onScroll(event, context) {
//       scrollY.value = event.contentOffset.y;
//     },
//     onMomentumEnd(event, context) {
//       //
//     }
//   })

//   return <Animated.FlatList data={cards} onScroll={onScroll} />
// }

export default function DemoScreen() {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const onIndexChange = (index: number) => {
    // console.log("🚀 ~ onIndexChange ~ index:", index);
    setActiveIndex(index);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar hidden />
      {activeIndex && (
        <Text
          style={{
            position: "absolute",
            color: "white"
          }}
        >
          Active Index: {activeIndex}
        </Text>
      )}
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ flex: 1 }}>
        <TarotWheel cards={cards} onIndexChagnge={onIndexChange} />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#164aa1",
    alignItems: "center",
    justifyContent: "center"
  }
});
