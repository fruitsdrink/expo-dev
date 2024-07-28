import { Dimensions, StyleSheet, View, Text, Image } from "react-native";

import { StatusBar } from "expo-status-bar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, SPACING } from "./constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { CELL_WIDTH } from ".";
import * as Animatable from "react-native-animatable";
import { SharedElement } from "react-navigation-shared-element";

const { width, height } = Dimensions.get("window");
const DURATION = 400;

const animation = {
  0: { opacity: 0, translateY: 100 },
  1: { opacity: 1, translateY: 0 }
};

const createAnimation = (from: number) => ({
  0: { opacity: 0, translateY: -100, translateX: from },
  1: { opacity: 1, translateY: 0, translateX: 0 }
});

const animations = [
  createAnimation(100),
  createAnimation(0),
  createAnimation(-100)
];

type Props = NativeStackScreenProps<RootStackParamList, "Detail">;
const DetailScreen = ({ navigation, route }: Props) => {
  const { item } = route.params;
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar hidden />
        <SharedElement
          id={`item.${item.key}.bg`}
          style={[StyleSheet.absoluteFillObject]}
        >
          <View
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: item.color }
            ]}
          />
        </SharedElement>
        <SharedElement id={`item.${item.key}.meta`} style={[]}>
          <View
            style={{
              position: "absolute",
              left: SPACING * 2,
              top: SPACING * 2
            }}
          >
            <Text style={styles.type}>{item.type}</Text>
            <Text style={styles.subType}>{item.subType}</Text>
          </View>
        </SharedElement>
        <View
          style={{
            marginTop: height * 0.1
          }}
        >
          <SharedElement id={`item.${item.key}.image`}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </SharedElement>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginBottom: SPACING * 3
            }}
          >
            {item.subcategories.map((sub, index) => {
              return (
                <Animatable.View
                  key={sub.key}
                  useNativeDriver
                  animation={animations[index]}
                  // iterationCount={10}
                  delay={DURATION}
                  style={{
                    backgroundColor: `${item.fullColor}99`,
                    padding: SPACING,
                    borderRadius: 50
                  }}
                >
                  <Image
                    source={{ uri: sub.image }}
                    style={{
                      width: 32,
                      height: 32,
                      resizeMode: "contain"
                    }}
                  />
                </Animatable.View>
              );
            })}
          </View>
        </View>
        <View style={{ padding: SPACING }}>
          <Animatable.Text
            animation={animation}
            delay={DURATION + 300}
            style={{
              fontSize: 32,
              fontWeight: "700",
              marginBottom: SPACING / 2
            }}
          >
            {item.price}
          </Animatable.Text>
          <Animatable.Text
            animation={animation}
            delay={DURATION + 400}
            style={{
              fontSize: 14,
              lineHeight: 20,
              color: "rgba(0,0,0,0.7)"
            }}
          >
            {item.description}
          </Animatable.Text>
        </View>
        <AntDesign
          name="close"
          size={28}
          color={"#333"}
          style={{
            padding: 12,
            position: "absolute",
            top: SPACING * 2,
            right: 0,
            zIndex: 2
          }}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </SafeAreaView>
    </>
  );
};

DetailScreen.sharedElements = (route: any) => {
  return [
    {
      id: `item.${route.params.item.key}.bg`
    },
    {
      id: `item.${route.params.item.key}.meta`
    },
    {
      id: `item.${route.params.item.key}.image`
    }
  ];
};

export default DetailScreen;

const styles = StyleSheet.create({
  type: {
    fontWeight: "800",
    fontSize: 22
  },
  subType: {
    fontSize: 12,
    opacity: 0.8
  },
  image: {
    width: CELL_WIDTH * 0.9,
    height: CELL_WIDTH * 0.9,
    alignSelf: "center",
    resizeMode: "contain",
    marginVertical: SPACING * 4,
    zIndex: 2
  }
});
