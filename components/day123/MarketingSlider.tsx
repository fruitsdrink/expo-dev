import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";

export const SPACING = 20;
const { width } = Dimensions.get("window");
const ITEM_WIDTH = (width / 3) * 2;

const SLIDER_DATA = [
  {
    title: "Sunny days",
    color: "turquoise"
  },
  {
    title: "Sand & beach",
    color: "aquamarine"
  },
  {
    title: "Coktails & party",
    color: "tomato"
  },
  {
    title: "All-inclusive",
    color: "#a531f9"
  }
];

export const DATA = [
  {
    imageUri: "https://cdn-icons-png.flaticon.com/128/2990/2990502.png",
    title: "Ukelele",
    id: "2990502"
  },
  {
    imageUri: "https://cdn-icons-png.flaticon.com/128/2990/2990505.png",
    title: "Sea",
    id: "2990505"
  },
  {
    imageUri: "https://cdn-icons-png.flaticon.com/128/2990/2990508.png",
    title: "Tiki",
    id: "2990508"
  },
  {
    imageUri: "https://cdn-icons-png.flaticon.com/128/2990/2990510.png",
    title: "Banana",
    id: "2990510"
  },
  {
    imageUri: "https://cdn-icons-png.flaticon.com/128/2990/2990512.png",
    title: "Coconut tree",
    id: "2990512"
  },
  {
    imageUri: "https://cdn-icons-png.flaticon.com/128/2990/2990515.png",
    title: "Fish",
    id: "2990515"
  },
  {
    imageUri: "https://cdn-icons-png.flaticon.com/128/2990/2990522.png",
    title: "Shop",
    id: "2990522"
  },
  {
    imageUri: "https://cdn-icons-png.flaticon.com/128/2990/2990527.png",
    title: "保龄球",
    id: "2990527"
  },
  {
    imageUri: "https://cdn-icons-png.flaticon.com/128/2990/2990532.png",
    title: "太阳伞",
    id: "2990532"
  },
  {
    imageUri: "https://cdn-icons-png.flaticon.com/128/2990/2990536.png",
    title: "Turtle",
    id: "2990536"
  },
  {
    imageUri: "https://cdn-icons-png.flaticon.com/128/2990/2990540.png",
    title: "Turtle",
    id: "2990540"
  },
  {
    imageUri: "https://cdn-icons-png.flaticon.com/128/2990/2990543.png",
    title: "Bikini",
    id: "2990543"
  }
];

export const MarketingSlider = () => {
  return (
    <FlatList
      data={SLIDER_DATA}
      keyExtractor={(item) => item.color}
      horizontal
      snapToInterval={ITEM_WIDTH + SPACING * 2}
      contentContainerStyle={{
        paddingRight: width - ITEM_WIDTH - SPACING * 2
      }}
      decelerationRate={"fast"}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => {
        return (
          <View style={[styles.itemContainer, { backgroundColor: item.color }]}>
            <Text style={styles.itemText}>{item.title}</Text>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 0.6,
    borderRadius: 16,
    padding: SPACING,
    marginHorizontal: SPACING
  },
  itemText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff"
  }
});
