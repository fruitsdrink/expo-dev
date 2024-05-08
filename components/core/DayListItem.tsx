import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { fonts } from "@/constants";
import { Link } from "expo-router";

interface Props {
  day: number;
}
export const DayListItem: React.FC<Props> = ({ day }) => {
  return (
    <Link href={`/days/day${day}`} asChild>
      <Pressable style={styles.box}>
        <Text style={styles.text}>{day}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#f9ede3",
    flex: 1,
    aspectRatio: 1,

    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#9b4521",
    borderRadius: 16,

    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#9b4521",
    fontSize: 50,
    fontFamily: fonts.Poppins,
  },
});
