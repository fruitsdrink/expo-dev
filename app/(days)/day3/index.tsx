import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import { globalStyles } from "@/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { DayHome, MarkdownDisplay } from "@/components";

const markdown = `
# Markdown 的使用

## 知识点
- 显示MarkDown内容

## 第三方包
- [react-native-markdown-display](https://github.com/iamacup/react-native-markdown-display)

`;

export default function Day3Screen() {
  return (
    <DayHome
      title="Day3 markdown"
      description={markdown}
      linkText="Go to editor"
      link="/day3/editor"
    />
  );
}
