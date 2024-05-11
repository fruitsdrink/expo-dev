import { fonts } from "@/constants";
import React from "react";
import { View, Text } from "react-native";
import { Marker, MarkerPressEvent } from "react-native-maps";

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
  onPress: (data: {
    id: number;
    latitude: number;
    longitude: number;
    price: number;
    title: string;
    numberOfStars: number;
    rating: number;
    image: string;
  }) => void;
}
export const CustomMarker: React.FC<Props> = ({ data, onPress }) => {
  return (
    <Marker
      onPress={() => onPress(data)}
      coordinate={{
        latitude: data.latitude,
        longitude: data.longitude,
      }}
      // title={appartment.title}
      // description={`${appartment.price}`}
    >
      <View
        style={{
          backgroundColor: "white",
          padding: 3,
          paddingHorizontal: 5,
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 50,
        }}
      >
        <Text
          style={{
            fontFamily: fonts.Inter,
          }}
        >
          $ {data.price}
        </Text>
      </View>
    </Marker>
  );
};
