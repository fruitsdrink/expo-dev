import { Link, Stack } from "expo-router";
import React from "react";
import { Pressable, View, Text, SafeAreaView, ScrollView } from "react-native";
import { MarkdownDisplay } from "./MarkdownDisplay";
import { fonts } from "@/constants";

interface DayHomeProps {
  title: string;
  description: string;
  buttons?: { text?: string; link: string }[];
}
export const DayHome: React.FC<DayHomeProps> = ({
  title,
  description,
  buttons,
}) => {
  return (
    <>
      <Stack.Screen
        options={{
          title,
        }}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{
            flex: 1,
            padding: 20,
          }}
        >
          <MarkdownDisplay>{description}</MarkdownDisplay>
        </ScrollView>

        {buttons && (
          <View
            style={{
              paddingTop: 16,
              gap: 8,
            }}
          >
            {buttons.map((btn, index) => (
              <Link href={btn.link} asChild key={index}>
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
                    {btn.text || "Go to demo"}
                  </Text>
                </Pressable>
              </Link>
            ))}
          </View>
        )}
      </SafeAreaView>
    </>
  );
};
