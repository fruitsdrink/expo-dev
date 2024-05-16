import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DayHome } from "@/components";

const desc = `
# Vision Camera

[youtube](https://www.youtube.com/live/XgPLshk9q9A?si=g2mTFR0OhToUELXwIme&Cursor:PleaseSwitchTo0)

## 知识点

- Vision Camera的使用

## 第三方包

- [Vision Camera](https://react-native-vision-camera.com)
- [图标](https://icons.expo.fyi/Index)

## 存在的问题

- 默认在android上编译错误
- 无法调用闪光灯
`;
export default function Day11Screen() {
  return (
    <DayHome
      description={desc}
      title="Vision Camera"
      buttons={[
        {
          link: "/day11/camera",
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({});
