import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DayHome } from "@/components";

const desc = `
# Airbnb Map & Bottom Sheet

## 知识点

- Google地图展示
- Google地图标记
- 底部弹窗

## 第三方库

- [react-native-maps](https://github.com/react-native-maps/react-native-maps)
- [react-native-bottom-sheet](https://github.com/gorhom/react-native-bottom-sheet)

## 资源
- [表情符号](https://symbl.cc)
`;

export default function Day5Screen() {
  return (
    <DayHome
      description={desc}
      title="airbnb map"
      buttons={[
        {
          text: "Airbnb Map",
          link: "/day5/airbnb",
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({});
