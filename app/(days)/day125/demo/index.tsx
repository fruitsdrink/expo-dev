import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Animated,
  Dimensions,
  FlatList,
  StatusBar,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import { RootStackParamList } from "./_layout";
import { faker } from "@faker-js/faker";
import { Image } from "expo-image";
import React from "react";
import {
  GestureDetector,
  Gesture,
  Directions
} from "react-native-gesture-handler";
import { SharedElement } from "react-navigation-shared-element";

const { width, height } = Dimensions.get("window");
const IMAGE_WIDTH = width * 0.86;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.5;
const VISIBLE_ITEMS = 4;
const SPACING = 12;

const data = [...Array(6).keys()].map((i) => {
  return {
    key: String(i),
    image: faker.image.url(),
    name: faker.lorem.word()
  };
});

export default function HomeScreen({
  navigation
}: NativeStackScreenProps<RootStackParamList, "Home">) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const reactiveAnimated = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactiveAnimated,
      duration: 300,
      useNativeDriver: true
    }).start();
  }, []);

  const setActiveSlide = React.useCallback((newIndex: number) => {
    setActiveIndex(newIndex);
    animatedValue.setValue(newIndex);
  }, []);

  const flingUp = Gesture.Fling()
    .runOnJS(true)
    .direction(Directions.UP)
    .onEnd((ev) => {
      if (activeIndex === data.length - 1) {
        return;
      }
      setActiveSlide(activeIndex + 1);
    });
  const flingDown = Gesture.Fling()
    .runOnJS(true)
    .direction(Directions.DOWN)
    .onEnd((ev) => {
      if (activeIndex === 0) {
        return;
      }
      setActiveSlide(activeIndex - 1);
    });

  const composed = Gesture.Race(flingUp, flingDown);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <GestureDetector gesture={composed}>
        <View style={styles.container}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.key}
            scrollEnabled={false}
            contentContainerStyle={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
            CellRendererComponent={({
              index,
              item,
              children,
              style,
              ...props
            }) => {
              const newStyle: StyleProp<ViewStyle> = [
                style,
                {
                  zIndex: data.length - index,
                  left: -IMAGE_WIDTH / 2,
                  top: -IMAGE_HEIGHT / 2
                }
              ];
              return (
                <View {...{ ...props, index }} style={newStyle}>
                  {children}
                </View>
              );
            }}
            renderItem={({ item, index }) => {
              const inputRange = [index - 1, index, index + 1];
              const translateY = animatedValue.interpolate({
                inputRange,
                outputRange: [-30, 0, 30]
              });
              const opacity = animatedValue.interpolate({
                inputRange,
                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0]
              });
              const scale = animatedValue.interpolate({
                inputRange,
                outputRange: [0.92, 1, 1.2]
              });
              return (
                <Animated.View
                  style={{
                    position: "absolute",
                    opacity,
                    transform: [{ translateY }, { scale }]
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Detail", {
                        item: data[activeIndex]
                      });
                    }}
                  >
                    <SharedElement
                      id={`item.${item.key}.image`}
                      style={styles.image}
                    >
                      <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                      />
                    </SharedElement>
                    <View
                      style={{ position: "absolute", bottom: 20, left: 20 }}
                    >
                      <SharedElement id={`item.${item.key}.name`}>
                        <Text
                          style={styles.name}
                          numberOfLines={1}
                          adjustsFontSizeToFit
                        >
                          {item.name}
                        </Text>
                      </SharedElement>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              );
            }}
          />
        </View>
      </GestureDetector>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1d1d"
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    resizeMode: "cover",
    borderRadius: 16
  },
  name: {
    textTransform: "uppercase",
    color: "#fff",
    fontSize: 36,
    fontWeight: "900"
  }
});
