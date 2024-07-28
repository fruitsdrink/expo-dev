import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  data,
  ORANGE,
  popularFood,
  RootStackParamList,
  SPACING
} from "./constants";
import { useState } from "react";
import { tabs } from "./constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { SharedElement } from "react-navigation-shared-element";

const { width, height } = Dimensions.get("window");
export const CELL_WIDTH = width * 0.64;
export const CELL_HEIGHT = CELL_WIDTH * 1.4;
const FULL_SIZE = CELL_WIDTH + SPACING * 2;

type Props = NativeStackScreenProps<RootStackParamList, "Home">;
const HomeScreen = ({ navigation }: Props) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  return (
    <ScrollView>
      <StatusBar hidden />

      <SafeAreaView
        style={{
          flex: 1
        }}
      >
        <FlatList
          data={tabs}
          keyExtractor={(item, index) => `${item}-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flexGrow: 0 }}
          contentContainerStyle={{ padding: SPACING }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => setSelectedTab(item)}>
                <View
                  style={[
                    styles.pill,
                    {
                      backgroundColor:
                        selectedTab === item ? ORANGE : "transparent"
                    }
                  ]}
                >
                  <Text
                    style={[
                      styles.pillText,
                      { color: selectedTab === item ? "#fff" : "#000" }
                    ]}
                  >
                    {item}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <FlatList
          data={data}
          keyExtractor={(item) => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={FULL_SIZE}
          decelerationRate={"fast"}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{
                  width: CELL_WIDTH,
                  height: CELL_HEIGHT,
                  margin: SPACING
                }}
                onPress={() => {
                  navigation.navigate("Detail", { item });
                }}
              >
                <View
                  style={{
                    flex: 1,
                    padding: SPACING,
                    justifyContent: "center"
                  }}
                >
                  <SharedElement
                    id={`item.${item.key}.bg`}
                    style={[StyleSheet.absoluteFillObject]}
                  >
                    <View
                      style={[
                        StyleSheet.absoluteFillObject,
                        { backgroundColor: item.color, borderRadius: 16 }
                      ]}
                    />
                  </SharedElement>
                  <SharedElement
                    id={`item.${item.key}.meta`}
                    style={[StyleSheet.absoluteFillObject]}
                  >
                    <View
                      style={{
                        position: "absolute",
                        left: SPACING,
                        top: SPACING
                      }}
                    >
                      <Text style={styles.type}>{item.type}</Text>
                      <Text style={styles.subType}>{item.subType}</Text>
                    </View>
                  </SharedElement>
                  <SharedElement id={`item.${item.key}.image`}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                  </SharedElement>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <FlatList
          data={popularFood}
          keyExtractor={(item) => item.key}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: SPACING
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.popularImage}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.popurType}>{item.type}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <AntDesign
                      name="star"
                      size={16}
                      color={ORANGE}
                      style={{ marginRight: SPACING / 2 }}
                    />
                    <Text style={{ fontWeight: "700" }}>{item.rating}</Text>
                  </View>
                </View>
                <Text style={styles.popularPrice}>{item.price}</Text>
              </View>
            );
          }}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: SPACING,
    paddingVertical: SPACING / 2,
    borderRadius: 12
  },
  pillText: {
    fontWeight: "700"
  },
  type: {
    fontWeight: "800",
    fontSize: 22
  },
  subType: {
    fontSize: 12,
    opacity: 0.8
  },
  image: {
    width: CELL_WIDTH * 0.7,
    height: CELL_WIDTH * 0.7,
    alignSelf: "center",
    resizeMode: "contain",
    position: "absolute"
  },
  popurType: {
    fontSize: 18,
    fontWeight: "800"
  },
  popularImage: {
    width: 54,
    height: 54,
    resizeMode: "contain",
    marginRight: SPACING
  },
  popularPrice: {
    fontWeight: "800"
  }
});
