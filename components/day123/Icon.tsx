import React from "react";
import { Image, StyleSheet, View } from "react-native";

export const ICON_SIZE = 48;

type Props = {
  uri: string;
};
export const Icon: React.FC<Props> = ({ uri }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: ICON_SIZE,
    aspectRatio: 1,
    borderRadius: ICON_SIZE / 2,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: ICON_SIZE * 0.6,
    aspectRatio: 1,
    resizeMode: "contain"
  }
});
