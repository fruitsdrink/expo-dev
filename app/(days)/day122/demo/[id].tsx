import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView
} from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { detailsIcons, salions } from ".";
import { AntDesign } from "@expo/vector-icons";
import Animated from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const SPACING = 10;
const ITEM_HEIGHT = SCREEN_HEIGHT * 0.18;
const TOP_HEADER_HEIGHT = SCREEN_HEIGHT * 0.3;

const DURATION = 400;

export default function Detail() {
  const { id } = useLocalSearchParams();

  const router = useRouter();

  console.log("id:", id);
  const item = salions.find((item) => item.key === id);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false
        }}
      />
      <View style={{ flex: 1 }}>
        <AntDesign
          name="arrowleft"
          size={24}
          color={"#333"}
          style={{
            padding: 12,
            position: "absolute",
            top: SPACING * 2,
            left: SPACING,
            zIndex: 2
          }}
          onPress={() => {
            router.back();
          }}
        />
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: item.color,
              borderRadius: 0,
              height: TOP_HEADER_HEIGHT + 32
            }
          ]}
        />
        <Text style={styles.name}>{item.name}</Text>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.bg}>
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginVertical: SPACING,
                marginBottom: SPACING + 32
              }}
            >
              {detailsIcons.map((detail, index) => {
                return (
                  <Animated.View
                    key={`${detail.icon}-${index}`}
                    style={{
                      backgroundColor: detail.color,
                      width: 64,
                      aspectRatio: 1,
                      borderRadius: 32,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <AntDesign name={detail.icon} size={22} color={"white"} />
                  </Animated.View>
                );
              })}
            </View>
            <View>
              {item.categories.map((category) => {
                return (
                  <Animated.View
                    key={category.key}
                    style={{ marginVertical: SPACING }}
                  >
                    <Text style={styles.title}>{category.title}</Text>
                    {category.subcats.map((subcat, index) => {
                      return (
                        <View
                          key={`${subcat}-${index}`}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: SPACING / 2,
                            marginLeft: SPACING
                          }}
                        >
                          <View
                            style={{
                              height: 8,
                              aspectRatio: 1,
                              borderRadius: 4,
                              backgroundColor: "gold",
                              marginRight: SPACING
                            }}
                          />
                          <Text style={styles.subTitle}>{subcat}</Text>
                        </View>
                      );
                    })}
                  </Animated.View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: "700",
    position: "absolute",
    top: TOP_HEADER_HEIGHT - SPACING * 3,
    left: SPACING
  },

  image: {
    width: ITEM_HEIGHT * 0.8,
    height: ITEM_HEIGHT * 0.8,
    resizeMode: "contain",
    position: "absolute",
    top: TOP_HEADER_HEIGHT - ITEM_HEIGHT * 0.8,
    right: SPACING
  },
  bg: {
    position: "absolute",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "white",
    borderRadius: 32,
    padding: SPACING,
    paddingTop: 32 + SPACING,
    transform: [
      {
        translateY: TOP_HEADER_HEIGHT
      }
    ]
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: SPACING
  },
  subTitle: {
    fontSize: 14,
    opacity: 0.8
  }
});
