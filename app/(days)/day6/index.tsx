import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DayHome } from "@/components";

const desc = `
# Tinder Swipe Card Animation

[youtube](https://www.youtube.com/live/H2Xr_id5JuE?si=RyMJPbY4N6SV01Hx)

## 知识点

- 线性渐变的使用
- 卡片堆叠效果的实现
- 插值的使用
- 卡片动画的实现
- 通过手势控制卡片的滑动

## 第三方包

- [expo-linear-gradient](https://github.com/expo/expo/tree/sdk-51/packages/expo-linear-gradient)

## 相关资源
- [css阴影在线生成](https://ethercreative.github.io/react-native-shadow-generator/)
`;

export default function Day6Screen() {
  return (
    <DayHome
      title="Tinder Swipe Animation"
      description={desc}
      buttons={[
        {
          link: "/day6/tinder",
        },
      ]}
    />
  );
}
