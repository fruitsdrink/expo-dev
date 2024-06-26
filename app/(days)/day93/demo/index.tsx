import {
  ActivityIndicator,
  Animated,
  Button,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import Svg, { G, Circle } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const asyncStoorageKey = "day93@viewedOnboarding";

const slides = [
  {
    id: 1,
    image: require("@/assets/images/day93/01.webp"),
    title: "Quick & Easy Payments",
    description:
      "Grow your business by accepting card payments with the new card reader."
  },
  {
    id: 2,
    image: require("@/assets/images/day93/02.webp"),
    title: "Smart Point of Sale",
    description:
      "Complete point of sale software tailored to your business needs."
  },
  {
    id: 3,
    image: require("@/assets/images/day93/03.webp"),
    title: "Instant Notifications",
    description:
      "Instant notifications let your quickly see new purchases and messages."
  },
  {
    id: 4,
    image: require("@/assets/images/day93/04.webp"),
    title: "Customize Everything",
    description: "Adjust your system to speed up your checkout."
  }
];

const OnboardingItem: React.FC<{
  item: (typeof slides)[0];
}> = ({ item }) => {
  return (
    <View
      style={{
        flex: 1,
        width: SCREEN_WIDTH,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <View
        style={{
          width: SCREEN_WIDTH * 0.8,
          aspectRatio: 1
        }}
      >
        <Image
          source={item.image}
          resizeMode="contain"
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View style={{ paddingHorizontal: 20, gap: 10, alignItems: "center" }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            color: "#493d8a"
          }}
        >
          {item.title}
        </Text>
        <Text style={{ fontSize: 16, color: "grey", marginHorizontal: 40 }}>
          {item.description}
        </Text>
      </View>
    </View>
  );
};

type PaginatorProps = {
  data: typeof slides;
  scollX: Animated.Value;
};
const Paginator: React.FC<PaginatorProps> = ({ data, scollX }) => {
  return (
    <View style={paginatorStyles.container}>
      {data.map((item, idx) => {
        const inputRange = [
          (idx - 1) * SCREEN_WIDTH,
          idx * SCREEN_WIDTH,
          (idx + 1) * SCREEN_WIDTH
        ];

        const dotWidth = scollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp"
        });

        const opacity = scollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp"
        });

        return (
          <Animated.View
            key={item.id}
            style={[paginatorStyles.dot, { width: dotWidth, opacity }]}
          />
        );
      })}
    </View>
  );
};

const paginatorStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 64,
    gap: 8
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#493d8a"
  }
});

type NextButtonProps = {
  percentage: number;
  scrollTo?: () => void;
};
const NextButton: React.FC<NextButtonProps> = ({ percentage, scrollTo }) => {
  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius; // 圆周长

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef<Circle>(null);

  const animation = (toValue: number) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener((value) => {
      const strokeDashoffset =
        circumference - (circumference * value.value) / 100;
      if (progressRef?.current) {
        progressRef.current.setNativeProps({
          strokeDashoffset
        });
      }
    });

    return () => {
      progressAnimation.removeAllListeners();
    };
  }, []);

  return (
    <View style={nextButtonStyles.container}>
      <Svg width={size} height={size}>
        <G rotation={-90} origin={center}>
          <Circle
            stroke={"#e6e7e8"}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <Circle
            ref={progressRef}
            stroke={"#f4338f"}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            // strokeDashoffset={circumference - (circumference * 60) / 100}
            fill="transparent"
          />
        </G>
      </Svg>
      <TouchableOpacity
        style={nextButtonStyles.button}
        activeOpacity={0.6}
        onPress={scrollTo}
      >
        <AntDesign name="arrowright" size={32} color={"#fff"} />
      </TouchableOpacity>
    </View>
  );
};

const nextButtonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    position: "absolute",
    backgroundColor: "#f4338f",
    borderRadius: 100,
    padding: 20
  }
});

type OnboardingProps = {
  onFinish?: () => void;
};
const Onboarding: React.FC<OnboardingProps> = ({ onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = async () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      try {
        await AsyncStorage.setItem(asyncStoorageKey, "true");
        onFinish?.();
      } catch (error) {
        console.log("Error @scrollTo", error);
      }
    }
  };

  return (
    <>
      <View style={onboardingStyles.container}>
        <View style={{ flex: 3 }}>
          <FlatList
            data={slides}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <OnboardingItem item={item} />}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: { contentOffset: { x: scrollX } }
                }
              ],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={32}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            ref={slidesRef}
          />
        </View>
        <Paginator data={slides} scollX={scrollX} />

        <NextButton
          percentage={(currentIndex + 1) * (100 / slides.length)}
          scrollTo={scrollTo}
        />
      </View>
    </>
  );
};

const onboardingStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

const HomeScreen = () => {
  const router = useRouter();
  return (
    <View style={homeScreenStyles.container}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
          marginBottom: 32
        }}
      >
        HomePage
      </Text>
      <View>
        <Button
          title={"清空存储显示Onboarding"}
          onPress={async () => {
            await AsyncStorage.removeItem(asyncStoorageKey);
            router.back();
          }}
        />
      </View>
    </View>
  );
};

const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

const Loading = () => {
  return (
    <View>
      <ActivityIndicator size={"large"} />
    </View>
  );
};

export default function DemoScreen() {
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem(asyncStoorageKey);
      if (value) {
        setViewedOnboarding(true);
      }
    } catch (error) {
      console.log("Error @checkOnboarding", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        {loading ? (
          <Loading />
        ) : viewedOnboarding ? (
          <HomeScreen />
        ) : (
          <Onboarding
            onFinish={() => {
              setViewedOnboarding(true);
            }}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
