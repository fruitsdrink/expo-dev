import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "./_layout";
import { AntDesign } from "@expo/vector-icons";
import { faker } from "@faker-js/faker";
import { LinearGradient } from "expo-linear-gradient";
import { SharedElement } from "react-navigation-shared-element";
import * as Animatable from "react-native-animatable";
import React from "react";

const { width, height } = Dimensions.get("window");

const Height = () => {
  return (
    <View>
      <Text style={styles.heading}>Height</Text>
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <Text style={styles.number}>
          {Math.floor(Math.random() * 2200) + 1000}
        </Text>
        <Text style={styles.numberType}>m</Text>
      </View>
    </View>
  );
};

const Distance = () => {
  return (
    <View>
      <Text style={styles.heading}>Distance</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.number}>{Math.floor(Math.random() * 40) + 20}</Text>
        <Text style={styles.numberType}>km</Text>
      </View>
    </View>
  );
};

const avatars = [...Array(6).keys()].map(faker.image.avatar);

const Avatars = () => {
  return (
    <View>
      <Text style={styles.heading}>Your team</Text>
      <View style={{ flexDirection: "row" }}>
        {avatars.map((uri, index) => {
          return (
            <Image
              source={{ uri }}
              key={index}
              style={[
                styles.avatar,
                {
                  zIndex: avatars.length - index,
                  marginLeft: index === 0 ? 0 : -20
                }
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

function DetailScreen({
  route,
  navigation
}: NativeStackScreenProps<RootStackParamList, "Detail">) {
  const topRef = React.useRef<Animatable.View>(null);
  const bottomRef = React.useRef<Animatable.View>(null);
  const { item } = route.params;

  return (
    <>
      <View style={styles.container}>
        <SharedElement id={`item.${item.key}.image`}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </SharedElement>
        <Animatable.View
          ref={topRef}
          animation={"fadeIn"}
          duration={800}
          delay={600}
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: "rgba(0,0,0,0.3)" }
          ]}
        >
          <AntDesign
            name="arrowleft"
            size={28}
            color={"#fff"}
            style={{
              paddingHorizontal: 12,
              position: "absolute",
              top: 50,
              left: 10,
              zIndex: 2
            }}
            onPress={() => {
              Promise.all([
                bottomRef.current.fadeOut(300),
                topRef.current.fadeOut(300)
              ]).then(() => {
                navigation.goBack();
              });
            }}
          />

          <LinearGradient
            colors={["transparent", "#000", "#000"]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: height / 2
            }}
          />
        </Animatable.View>
        <View
          style={{
            flex: 1,
            position: "absolute",
            bottom: 70,
            justifyContent: "flex-end"
          }}
        >
          <View style={{ paddingHorizontal: 20, alignItems: "flex-start" }}>
            <SharedElement id={`item.${item.key}.name`}>
              <Text
                style={styles.name}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
              >
                {item.name}
              </Text>
            </SharedElement>
          </View>
          <Animatable.View
            ref={bottomRef}
            animation={"fadeIn"}
            duration={800}
            delay={700}
            style={{
              width,
              flexDirection: "row",
              justifyContent: "space-evenly"
            }}
          >
            <Avatars />
            <Distance />
            <Height />
          </Animatable.View>
        </View>
      </View>
    </>
  );
}

DetailScreen.sharedElements = (route, otherRoute, showing) => {
  const { item } = route.params;
  return [
    {
      id: `item.${item.key}.image`
    },
    {
      id: `item.${item.key}.name`
    }
  ];
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1d1d"
  },
  image: {
    width,
    height,
    resizeMode: "cover"
  },
  name: {
    textTransform: "uppercase",
    color: "#fff",
    fontSize: 62,
    fontWeight: "900"
  },
  heading: {
    color: "#fff",
    fontWeight: "300",
    marginBottom: 8
  },
  number: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 32,
    marginRight: 2,
    marginBottom: -5
  },
  numberType: {
    color: "#fff",
    fontSize: 12
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 26,
    borderWidth: 4,
    borderColor: "#000"
  }
});
