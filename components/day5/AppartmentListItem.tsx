import { fonts } from "@/constants";
import React from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

interface Props {
  data: {
    id: number;
    latitude: number;
    longitude: number;
    price: number;
    title: string;
    numberOfStars: number;
    rating: number;
    image: string;
  };
  containerStyle?: StyleProp<ViewStyle>;
}

export const AppartmentlistItem: React.FC<Props> = ({
  data,
  containerStyle,
}) => {
  return (
    <View style={[styles.card, containerStyle]}>
      <Image
        source={{
          uri: data.image,
        }}
        style={styles.image}
      />
      <View style={styles.rightContainer}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.description}>
          Stay at this apartment for an affordable price
        </Text>

        <View style={styles.footer}>
          <Text style={styles.price}>$ {data.price} night</Text>
          <Text style={styles.price}>
            ★ {data.rating} {data.numberOfStars}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",

    flexDirection: "row",

    overflow: "hidden",
  },
  image: {
    width: 150,
    aspectRatio: 1,
    borderRadius: 10,
  },
  rightContainer: {
    padding: 10,
    flex: 1,
  },
  title: {
    fontFamily: fonts.PoppinsSemiBold,
    marginBottom: 10,
    fontSize: 16,
  },
  description: {
    color: "gray",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
  },
  price: {
    fontFamily: fonts.InterBold,
  },
});
