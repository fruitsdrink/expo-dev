import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import {
  BG_COLOR,
  cars,
  ITEM_SIZE,
  RootStackParamList,
  SPACING
} from "./constants";
import { SharedElement } from "react-navigation-shared-element";

const { width, height } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cars}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{
          padding: SPACING
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Detail", { item });
              }}
            >
              <View style={styles.item}>
                <View>
                  <SharedElement id={`item.${item.key}.model`}>
                    <Text style={styles.model}>{item.model}</Text>
                  </SharedElement>
                  <SharedElement id={`item.${item.key}.desc`}>
                    <Text style={styles.description}>{item.description}</Text>
                  </SharedElement>
                </View>
                <SharedElement
                  id={`item.${item.key}.image`}
                  style={styles.image}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{ flex: 1, resizeMode: "center" }}
                  />
                </SharedElement>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    height: ITEM_SIZE,
    borderRadius: 12,
    marginBottom: SPACING,
    padding: SPACING,
    backgroundColor: BG_COLOR,
    overflow: "hidden"
  },
  model: {
    fontSize: 18,
    fontWeight: "700",
    position: "absolute"
  },
  description: {
    fontSize: 12,
    opacity: 0.7,
    position: "absolute",
    top: 20 + SPACING / 2
  },
  image: {
    height: ITEM_SIZE * 1.2,
    width: "100%",
    position: "absolute",
    bottom: 0,
    right: "-40%"
  }
});
