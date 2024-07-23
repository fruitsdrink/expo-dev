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
import * as Animatable from "react-native-animatable";
import { NavigationProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SharedElement } from "react-navigation-shared-element";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const SPACING = 10;
const ITEM_HEIGHT = SCREEN_HEIGHT * 0.18;
const TOP_HEADER_HEIGHT = SCREEN_HEIGHT * 0.3;

const DURATION = 400;

interface Props
  extends NativeStackScreenProps<
    {
      Home: undefined;
      Detail: { item: any } | undefined;
    },
    "Detail"
  > {
  // other props ...
}
const Detail = ({ route, navigation }: Props) => {
  const { item } = route.params;
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
            navigation.goBack();
          }}
        />
        <SharedElement id={`item.${item.key}.bg`}>
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
        </SharedElement>
        <SharedElement id={`item.${item.key}.name`}>
          <Text style={styles.name}>{item.name}</Text>
        </SharedElement>
        <SharedElement id={`item.${item.key}.image`}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </SharedElement>

        <SharedElement id="general.bg">
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
                    <Animatable.View
                      key={`${detail.icon}-${index}`}
                      animation={"bounceIn"}
                      delay={DURATION + index * 100}
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
                    </Animatable.View>
                  );
                })}
              </View>
              <View>
                {item.categories.map((category, index) => {
                  return (
                    <Animatable.View
                      key={category.key}
                      animation={"fadeInUp"}
                      delay={DURATION * 2 + index * 200}
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
                    </Animatable.View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </SharedElement>
      </View>
    </>
  );
};

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
    top: TOP_HEADER_HEIGHT - ITEM_HEIGHT * 0.8 + 10,
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

Detail.sharedElements = (route, otherRoute, showing) => {
  const { item } = route.params;

  return [
    {
      id: `item.${item.key}.bg`
    },
    {
      id: `item.${item.key}.name`
    },
    {
      id: `item.${item.key}.image`
    },
    {
      id: "general.bg"
    }
  ];
};
export default Detail;
