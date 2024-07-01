import {
  Animated,
  Dimensions,
  Image,
  NativeScrollEvent,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle
} from "react-native";

import { Stack } from "expo-router";
import { useRef } from "react";
import { ImageStyle } from "expo-image";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function DemoScreen() {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const lastOffsetY = useRef(0);
  const scrollDirection = useRef("");

  const getFeatureViewAnimation = (
    animated: Animated.Value,
    offsetX: number
  ) => {
    const viewAnimation: StyleProp<ViewStyle> = {
      transform: [
        {
          translateX: animated.interpolate({
            inputRange: [0, 80],
            outputRange: [0, offsetX],
            extrapolate: "clamp"
          })
        },
        {
          translateY: animated.interpolate({
            inputRange: [0, 100],
            outputRange: [0, -55],
            extrapolate: "clamp"
          })
        }
      ]
    };
    return viewAnimation;
  };

  const searchInputAnimation: StyleProp<ViewStyle> = {
    transform: [
      {
        scaleX: animatedValue.interpolate({
          inputRange: [0, 50],
          outputRange: [1, 0],
          extrapolate: "clamp"
        })
      },
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 25],
          outputRange: [0, -100],
          extrapolate: "clamp"
        })
      }
    ],
    opacity: animatedValue.interpolate({
      inputRange: [0, 25],
      outputRange: [1, 0],
      extrapolate: "clamp"
    })
  };

  const featureNameAnimation: StyleProp<TextStyle> = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 30],
          outputRange: [1, 0],
          extrapolate: "clamp"
        })
      }
    ],
    opacity: animatedValue.interpolate({
      inputRange: [0, 30],
      outputRange: [1, 0],
      extrapolate: "clamp"
    })
  };

  const depositViewAnimation: StyleProp<ViewStyle> = getFeatureViewAnimation(
    animatedValue,
    36
  );

  const withdrawViewAnimation: StyleProp<ViewStyle> = getFeatureViewAnimation(
    animatedValue,
    -16
  );

  const qrViewAnimation: StyleProp<ViewStyle> = getFeatureViewAnimation(
    animatedValue,
    -56
  );

  const scanViewAnimation: StyleProp<ViewStyle> = getFeatureViewAnimation(
    animatedValue,
    -92
  );

  const featureIconCircleAnimation: StyleProp<ImageStyle> = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 25],
      outputRange: [1, 0],
      extrapolate: "clamp"
    })
  };

  const featureIconAnimation: StyleProp<ImageStyle> = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 50],
      outputRange: [0, 1],
      extrapolate: "clamp"
    })
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <View style={styles.upperHeaderPlaceholder} />
        </SafeAreaView>
        <SafeAreaView style={styles.header}>
          <View style={styles.upperHeader}>
            <View style={styles.searchContainer}>
              <Image
                source={require("@/assets/images/day103/search.png")}
                style={styles.searchIcon}
              />
              <AnimatedTextInput
                placeholder="Search"
                placeholderTextColor={"rgba(255,255,255,0.8)"}
                style={[styles.searchInput, searchInputAnimation]}
              />
            </View>
            <Image
              source={require("@/assets/images/day103/bell.png")}
              style={styles.bellIcon}
            />
            <Image
              source={require("@/assets/images/day103/avatar.png")}
              style={styles.avatar}
            />
          </View>
          <View style={styles.lowerHeader}>
            <Animated.View style={[styles.feature, depositViewAnimation]}>
              <Animated.Image
                source={require("@/assets/images/day103/deposit-circle.png")}
                style={[styles.featureIconCircle, featureIconCircleAnimation]}
              />
              <Animated.Image
                source={require("@/assets/images/day103/deposit.png")}
                style={[styles.featureIcon, featureIconAnimation]}
              />
              <Animated.Text style={[styles.featureName, featureNameAnimation]}>
                Menu1
              </Animated.Text>
            </Animated.View>

            <Animated.View style={[styles.feature, withdrawViewAnimation]}>
              <Animated.Image
                source={require("@/assets/images/day103/withdraw-circle.png")}
                style={[styles.featureIconCircle, featureIconCircleAnimation]}
              />
              <Animated.Image
                source={require("@/assets/images/day103/withdraw.png")}
                style={[styles.featureIcon, featureIconAnimation]}
              />
              <Animated.Text style={[styles.featureName, featureNameAnimation]}>
                Menu2
              </Animated.Text>
            </Animated.View>

            <Animated.View style={[styles.feature, qrViewAnimation]}>
              <Animated.Image
                source={require("@/assets/images/day103/qr-circle.png")}
                style={[styles.featureIconCircle, featureIconCircleAnimation]}
              />
              <Animated.Image
                source={require("@/assets/images/day103/qr.png")}
                style={[styles.featureIcon, featureIconAnimation]}
              />
              <Animated.Text style={[styles.featureName, featureNameAnimation]}>
                Menu3
              </Animated.Text>
            </Animated.View>
            <Animated.View style={[styles.feature, scanViewAnimation]}>
              <Animated.Image
                source={require("@/assets/images/day103/scan-circle.png")}
                style={[styles.featureIconCircle, featureIconCircleAnimation]}
              />
              <Animated.Image
                source={require("@/assets/images/day103/scan.png")}
                style={[styles.featureIcon, featureIconAnimation]}
              />
              <Animated.Text style={[styles.featureName, featureNameAnimation]}>
                Menu4
              </Animated.Text>
            </Animated.View>
          </View>
        </SafeAreaView>

        <Animated.ScrollView
          ref={scrollViewRef}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event<NativeScrollEvent>(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: animatedValue
                  }
                }
              }
            ],
            {
              useNativeDriver: true,
              listener: (event) => {
                const offsetY = event.nativeEvent.contentOffset.y;
                scrollDirection.current =
                  offsetY - lastOffsetY.current > 0 ? "down" : "up";
                lastOffsetY.current = offsetY;
              }
            }
          )}
          // onScroll={(e) => {
          //   const offsetY = e.nativeEvent.contentOffset.y;
          //   animatedValue.setValue(offsetY);
          // }}
          onScrollEndDrag={() => {
            scrollViewRef.current?.scrollTo({
              y: scrollDirection.current === "down" ? 100 : 0,
              animated: true
            });
          }}
        >
          <View style={styles.paddingForHeader} />
          <View style={styles.scrollViewContent} />
        </Animated.ScrollView>
      </View>
    </>
  );
}

const UPPER_HEADER_HEIGHT = 40;
const LOWER_HEADER_HEIGHT = 96;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#af0c6e"
    // height: 136
  },
  upperHeader: {
    height: UPPER_HEADER_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16
  },
  searchContainer: {
    flex: 1,
    justifyContent: "center"
  },
  searchIcon: {
    width: 16,
    height: 16,
    marginLeft: 8
  },
  searchInput: {
    position: "absolute",
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.3)",
    color: "white",
    borderRadius: 4,
    paddingVertical: 4,
    paddingLeft: 32
  },
  bellIcon: {
    width: 16,
    height: 16,
    marginHorizontal: 32
  },
  avatar: {
    width: 28,
    height: 28
  },
  lowerHeader: {
    height: LOWER_HEADER_HEIGHT,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16
  },
  feature: {
    alignItems: "center"
  },
  featureIconCircle: {
    width: 32,
    height: 32
  },
  featureIcon: {
    width: 16,
    height: 16,
    position: "absolute",
    top: 8
  },
  featureName: {
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 14,
    color: "white",
    marginTop: 12
  },
  upperHeaderPlaceholder: {
    height: UPPER_HEADER_HEIGHT
  },
  paddingForHeader: {
    height: LOWER_HEADER_HEIGHT
  },
  scrollViewContent: {
    height: SCREEN_HEIGHT * 2,
    backgroundColor: "white"
  }
});
