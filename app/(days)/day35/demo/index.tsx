import { Stack } from "expo-router";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Animated
} from "react-native";

const { width, height } = Dimensions.get("screen");
import { faker, Randomizer } from "@faker-js/faker";
import { useRef } from "react";

// Inspiration: https://dribbble.com/shots/14154226-Rolodex-Scrolling-Animation/attachments/5780833?mode=media
// Photo by Sharefaith from Pexels
// Background image: https://www.pexels.com/photo/pink-rose-closeup-photography-1231265/

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.string.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.arrayElement([
      "women",
      "men"
    ])}/${faker.number.int(60)}.jpg`,
    name: faker.person.fullName(),
    jobTitle: faker.person.jobTitle(),
    email: faker.internet.email()
  };
});

const SPACING = 20;
const AVATAR_SIZE = 70;
const BG =
  "https://i2.mjj.rip/2024/06/08/878d778d673fe1abd9adedc11a32018d.md.jpeg";
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

export default function Day35DemoScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Image
          source={{ uri: BG }}
          style={StyleSheet.absoluteFillObject}
          blurRadius={80}
        />
        <Animated.FlatList
          data={DATA}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          keyExtractor={(item) => item.key}
          contentContainerStyle={{
            padding: SPACING,
            paddingTop: StatusBar.currentHeight || 42
          }}
          renderItem={({ item, index }) => {
            const inputRane = [
              -1,
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 2)
            ];
            const opacityInputRane = [
              -1,
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 1)
            ];

            const scale = scrollY.interpolate({
              inputRange: inputRane,
              outputRange: [1, 1, 1, 0]
            });
            const opacity = scrollY.interpolate({
              inputRange: opacityInputRane,
              outputRange: [1, 1, 1, 0]
            });

            return (
              <Animated.View
                style={{
                  flexDirection: "row",
                  padding: SPACING,
                  marginBottom: SPACING,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: 12,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 10
                  },
                  shadowOpacity: 0.15,
                  shadowRadius: 20,
                  transform: [{ scale }],
                  opacity
                }}
              >
                <Image
                  source={{
                    uri: item.image
                  }}
                  style={{
                    width: AVATAR_SIZE,
                    height: AVATAR_SIZE,
                    borderRadius: AVATAR_SIZE,
                    marginRight: SPACING / 2
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 22, fontWeight: "800" }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{ fontSize: 18, opacity: 0.7 }}
                    numberOfLines={1}
                  >
                    {item.jobTitle}
                  </Text>
                  <Text
                    style={{ fontSize: 14, opacity: 0.8, color: "#0099cc" }}
                  >
                    {item.email}
                  </Text>
                </View>
              </Animated.View>
            );
          }}
        />
      </View>
      <StatusBar hidden={true} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
