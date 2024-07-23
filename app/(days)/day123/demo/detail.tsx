import { BackIcon } from "@/components/day123/BackIcon";
import { ICON_SIZE, Icon } from "@/components/day123/Icon";
import { DATA, SPACING } from "@/components/day123/MarketingSlider";
import React from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import {
  SharedElement,
  SharedElementCompatRoute
} from "react-navigation-shared-element";

const { width } = Dimensions.get("window");

const Detail = ({
  navigation,
  route
}: NativeStackScreenProps<RootStackParamList, "Detail">) => {
  const { item } = route.params;
  const ref = React.useRef<FlatList>(null);
  const selectedItemIndex = DATA.findIndex((i) => i.id === item.id);
  const mountedAnimated = React.useRef(new Animated.Value(0)).current;
  const activeIndex = React.useRef(
    new Animated.Value(selectedItemIndex)
  ).current;
  const activeIndexAnimation = React.useRef(
    new Animated.Value(selectedItemIndex)
  ).current;

  const animation = (toValue: number, delay: number = 0) => {
    return Animated.timing(mountedAnimated, {
      toValue,
      duration: 500,
      delay,
      useNativeDriver: true
    });
  };

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(activeIndexAnimation, {
        toValue: activeIndex,
        duration: 300,
        useNativeDriver: true
      }),
      animation(1, 500)
    ]).start();
  }, []);

  const translateY = mountedAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0]
  });

  const size = ICON_SIZE + SPACING * 2;
  const translateX = activeIndexAnimation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [size, 0, -size]
  });

  return (
    <View style={{ flex: 1 }}>
      <BackIcon
        onPress={() => {
          animation(0).start(() => {
            navigation.goBack();
          });
        }}
      />
      <Animated.View
        style={{
          flexDirection: "row",
          flexWrap: "nowrap",
          marginVertical: 20,
          marginLeft: width / 2 - ICON_SIZE / 2 - SPACING,
          transform: [
            {
              translateX
            }
          ]
        }}
      >
        {DATA.map((item, index) => {
          const inputRange = [index - 1, index, index + 1];
          const opacity = activeIndexAnimation.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp"
          });

          return (
            <TouchableOpacity
              key={item.id}
              style={{ padding: SPACING, alignItems: "center" }}
              onPress={() => {
                activeIndex.setValue(index);
                ref.current.scrollToIndex({
                  index,
                  animated: true
                });
              }}
            >
              <Animated.View
                style={{
                  alignItems: "center",
                  opacity
                }}
              >
                <SharedElement id={`item.${item.id}.icon`}>
                  <Icon uri={item.imageUri} />
                </SharedElement>
                <Text style={{ fontSize: 10, textAlign: "center" }}>
                  {item.title}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </Animated.View>
      <Animated.FlatList
        style={{
          opacity: mountedAnimated,
          transform: [
            {
              translateY
            }
          ]
        }}
        ref={ref}
        data={DATA}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        nestedScrollEnabled
        initialScrollIndex={selectedItemIndex}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index
        })}
        onMomentumScrollEnd={(ev) => {
          const newIndex = Math.floor(ev.nativeEvent.contentOffset.x / width);
          console.log({ newIndex });
          activeIndex.setValue(newIndex);
        }}
        renderItem={({ item }) => {
          return (
            <ScrollView
              style={{
                width: width - SPACING * 2,
                margin: SPACING,
                backgroundColor: "rgba(0,0,0,0.05)",
                borderRadius: 16
              }}
            >
              <View
                style={{
                  padding: SPACING
                }}
              >
                <Text
                  style={{
                    fontSize: 16
                  }}
                >
                  {Array(50).fill(`${item.title} inner text \n`)}
                </Text>
              </View>
            </ScrollView>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center"
  }
});

Detail.sharedElements = (
  route: SharedElementCompatRoute,
  otherRoute: SharedElementCompatRoute,
  showing: boolean
) => {
  // const { item } = route.params;
  return DATA.map((item) => `item.${item.id}.icon`);
};

export default Detail;
