import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Dimensions,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  View,
  FlatList
} from "react-native";
import { RootStackParamList } from "./_layout";
import { AntDesign } from "@expo/vector-icons";
import { tutorial12Spec, width } from "./constants";
import { SharedElement } from "react-navigation-shared-element";
import * as animatable from "react-native-animatable";

const { ITEM_WIDTH, ITEM_HEIGHT, RADIUS, SPACING, FULL_SIZE } = tutorial12Spec;

const zoomIn = {
  0: {
    opacity: 0,
    scale: 0
  },
  1: {
    opacity: 1,
    scale: 1
  }
};

function DetailScreen({
  navigation,
  route
}: NativeStackScreenProps<RootStackParamList, "Detail">) {
  const { item } = route.params;
  console.log({ item });
  return (
    <>
      <SafeAreaView style={styles.container}>
        <AntDesign
          name="arrowleft"
          size={24}
          color={"#fff"}
          style={{
            paddingHorizontal: SPACING,
            position: "absolute",
            top: 50,
            left: 10,
            zIndex: 2
          }}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <SharedElement
          id={`item.${item.key}.photo`}
          style={StyleSheet.absoluteFillObject}
        >
          <View style={[StyleSheet.absoluteFillObject]}>
            <Image
              source={{ uri: item.image }}
              style={[
                StyleSheet.absoluteFillObject,
                {
                  resizeMode: "cover"
                }
              ]}
            />
            <View
              style={[
                StyleSheet.absoluteFillObject,
                {
                  backgroundColor: "rgba(0,0,0,0.1)"
                }
              ]}
            />
          </View>
        </SharedElement>
        <SharedElement id={`item.${item.key}.location`}>
          <Text style={[styles.location]}>{item.location}</Text>
        </SharedElement>
        <View
          style={{
            position: "absolute",
            bottom: 120
          }}
        >
          <Text
            style={[
              {
                fontSize: 16,
                width: "100%",
                textTransform: "uppercase",
                fontWeight: "800",
                color: "#fff",
                marginHorizontal: SPACING
              }
            ]}
          >
            Activities
          </Text>
          <FlatList
            data={[...Array(8).keys()]}
            keyExtractor={(item) => String(item)}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              padding: SPACING
            }}
            renderItem={({ item, index }) => {
              return (
                <animatable.View
                  duration={700}
                  delay={400 + index * 100}
                  // animation={"fadeIn"}
                  animation={zoomIn}
                  style={{
                    backgroundColor: "#fff",
                    padding: SPACING,
                    width: width * 0.33,
                    height: width * 0.5,
                    marginRight: SPACING
                  }}
                >
                  <Image
                    source={{
                      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgLAaYN148EFEj-8jNQW18xuq7w4JCAA-XsKz883a49oivRboN-GewokJaP8SQqAEko1M&usqp=CAU"
                    }}
                    style={{
                      width: "100%",
                      height: "70%",
                      resizeMode: "cover"
                    }}
                  />
                  <Text>Activity #{item + 1}</Text>
                </animatable.View>
              );
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

DetailScreen.sharedElements = (route, otherRoute, showing) => {
  const { item } = route.params;
  // return [`item.${item.key}.photo`];
  return [
    {
      id: `item.${item.key}.photo`
    },
    {
      id: `item.${item.key}.location`
    }
  ];
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  location: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "800",
    width: ITEM_WIDTH * 0.8,
    textTransform: "uppercase",
    position: "absolute",
    top: SPACING * 4,
    left: SPACING * 2
  }
});
