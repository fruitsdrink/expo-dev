import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ListItem } from "@/types";
import { fonts } from "@/constants";
import dayjs from "dayjs";
import { BlurView } from "expo-blur";

type Props = {
  data: ListItem;
};
export const ForecastItem: React.FC<Props> = ({ data }) => {
  return (
    <BlurView intensity={80} style={styles.container}>
      <Text style={styles.temp}>{Math.round(data.main.temp)}℃</Text>
      <Text style={styles.date}>{dayjs(data.dt * 1000).format("ddd ha")}</Text>
      <Image
        source={{
          uri: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
        }}
        style={{ width: 40, height: 40 }}
      />
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    aspectRatio: 9 / 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "gainsboro",
  },
  temp: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: 16,
    color: "white",
    marginVertical: 8,
  },
  date: {
    fontSize: 14,
    color: "ghostwhite",
    fontFamily: fonts.Poppins,
  },
});
