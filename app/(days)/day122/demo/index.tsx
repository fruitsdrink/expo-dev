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

import { faker } from "@faker-js/faker";
import niceColors from "nice-color-palettes";
import { NavigationProp } from "@react-navigation/native";
import { SharedElement } from "react-navigation-shared-element";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

faker.seed(1);
const colors = [
  ...niceColors[1].slice(1, niceColors[1].length),
  ...niceColors[55].slice(0, 3)
];

const data = [
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435041.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435061.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435065.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435050.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435037.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435043.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435055.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435049.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435047.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435039.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435036.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435064.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435034.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435042.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435032.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435031.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435021.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435035.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435028.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435060.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435025.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435033.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435069.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435059.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435030.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435046.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435048.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435023.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435026.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435029.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435040.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435054.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435057.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435045.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435062.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435066.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435068.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435022.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435056.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435063.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435038.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435027.png"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/435/435052.png"
  }
];

export const detailsIcons = [
  { color: "#9fd7f1", icon: "isv" },
  { color: "#f3b000", icon: "Trophy" },
  { color: "#f2988f", icon: "edit" }
] as const;

export const salions = data.map((item, index) => ({
  ...item,
  key: faker.string.uuid(),
  color: colors[index % colors.length],
  name: faker.person.firstName(),
  jobTitle: faker.person.jobTitle(),
  categories: [...Array(3).keys()].map(() => {
    return {
      key: faker.string.uuid(),
      title: faker.person.jobTitle(),
      subcats: [...Array(3).keys()].map(faker.person.jobTitle)
    };
  })
}));

const SPACING = 10;
const ITEM_HEIGHT = SCREEN_HEIGHT * 0.18;

export default function DemoScreen({
  navigation
}: {
  navigation: NavigationProp<any, any>;
}) {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={salions}
          keyExtractor={(item) => item.key}
          initialNumToRender={10}
          contentContainerStyle={{
            padding: SPACING
          }}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  console.log("item press " + item.key);
                  navigation.navigate("Detail", { item });
                }}
                style={{
                  marginBottom: SPACING,
                  height: ITEM_HEIGHT
                }}
              >
                <View style={{ flex: 1, padding: SPACING }}>
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
                  <SharedElement id={`item.${item.key}.name`}>
                    <Text style={styles.name}>{item.name}</Text>
                  </SharedElement>
                  <Text style={styles.jobTitle}>{item.jobTitle}</Text>
                  <SharedElement
                    id={`item.${item.key}.image`}
                    style={styles.image}
                  >
                    <Image source={{ uri: item.image }} style={styles.image} />
                  </SharedElement>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <SharedElement id="general.bg">
          <View style={styles.bg} />
        </SharedElement>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 18,
    fontWeight: "700",
    position: "absolute"
  },
  jobTitle: {
    fontSize: 11,
    opacity: 0.7,
    marginTop: 18 * 1.2
  },
  image: {
    width: ITEM_HEIGHT * 0.8,
    height: ITEM_HEIGHT * 0.8,
    resizeMode: "contain",
    position: "absolute",
    bottom: 0,
    right: SPACING
  },
  bg: {
    position: "absolute",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "white",
    borderRadius: 32,
    transform: [
      {
        translateY: SCREEN_HEIGHT
      }
    ]
  }
});
