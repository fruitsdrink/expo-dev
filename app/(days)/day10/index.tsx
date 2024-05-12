import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DayHome } from "@/components";

const desc = `
# Fingerprint and FaceID

[youtube](https://www.youtube.com/live/cDz9Wt8xM5c?si=aHFXj4clGHerVumf)

## 知识点
- 指纹验证
- 人脸验证

## 使用方法

需要使用 \`npx expo run:ios\` 或 \`npx expo run:android\` 运行本机代码

## 第三方包
- [expo-local-authentication](https://docs.expo.dev/versions/latest/sdk/local-authentication/)
`;

export default function Day10Screen() {
  return (
    <DayHome
      title="Fingerprint and FaceID"
      description={desc}
      buttons={[
        {
          link: "/day10/protected",
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({});
