import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { fonts } from "@/constants";
import { Link } from "expo-router";

interface Props {
  day: {
    day: number;
    title: string;
    link?: string;
  };
}
export const DayListItem: React.FC<Props> = ({ day }) => {
  return (
    <Link href={`/(days)/day${day.day}`} asChild>
      <Pressable style={styles.box}>
        <Text style={styles.text}>{day.day}</Text>

        {day.link ? (
          <Link href={day.link} asChild>
            <Pressable>
              <Text style={{ textAlign: "center" }}>{day.title}</Text>
            </Pressable>
          </Link>
        ) : (
          <Text style={{ textAlign: "center" }}>{day.title}</Text>
        )}
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
    padding: 8,
  },
  text: {
    color: "#9b4521",
    fontSize: 50,
    fontFamily: fonts.Poppins,
  },
});
