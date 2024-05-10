import { Link, Stack } from "expo-router";
import React from "react";
import { Pressable, View, Text, SafeAreaView } from "react-native";
import { MarkdownDisplay } from "./MarkdownDisplay";
import { fonts } from "@/constants";

interface DayHomeProps {
  title: string;
  description: string;
  linkText?: string;
  link: string;
}
export const DayHome: React.FC<DayHomeProps> = ({
  title,
  description,
  linkText,
  link,
}) => {
  return (
    <>
      <Stack.Screen
        options={{
          title,
        }}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            padding: 20,
          }}
        >
          <MarkdownDisplay>{description}</MarkdownDisplay>
        </View>

        <Link href={link} asChild>
          <Pressable
            style={{
              marginHorizontal: 40,
              padding: 10,
              alignItems: "center",
              backgroundColor: "red",
              borderRadius: 100,
            }}
          >
            <Text
              style={{
                fontFamily: fonts.PoppinsSemiBold,
                color: "white",
              }}
            >
              {linkText || "Go to demo"}
            </Text>
          </Pressable>
        </Link>
      </SafeAreaView>
    </>
  );
};
