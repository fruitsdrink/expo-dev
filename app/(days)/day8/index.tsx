import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DayHome } from "@/components";

const desc = `
# 天气应用
[youtube](https://www.youtube.com/live/Z0fTSK_UeNk?si=VTJVymD3_1v_i2S7)

## 知识点
- 环境变量的读取
- 地理位置的获取
- 背景图片的使用
- 遮罩层的使用
- BlurView的使用
- 天气图标的使用

## 第三方包
- [expo-location](https://docs.expo.dev/versions/latest/sdk/location/)
- [blur-view](https://docs.expo.dev/versions/latest/sdk/blur-view/)

## 第三方服务
- [openweathermap](https://openweathermap.org)
- [unsplash api](https://unsplash.com/developers)

## 资料文档
- [天气图标用法](https://openweathermap.org/weather-conditions)
`;

export default function Day8Screen() {
  return (
    <DayHome
      title="Weather App"
      description={desc}
      buttons={[{ link: "/day8/weather" }]}
    />
  );
}

const styles = StyleSheet.create({});
