import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DayHome } from "@/components";

const desc = `
# TikTok Video Feed

[youtube](https://www.youtube.com/live/ss6M5xztvWY?si=aMUMDH4RaWd9BOML)

## 知识点

- 视频摄像头的使用
- 全屏渲染列表
- 页面滚动时自动播放/暂停视频
`;
export default function Day12Screen() {
  return (
    <DayHome
      title="TikTok Video Feed"
      description={desc}
      buttons={[
        {
          link: "/day12/feed",
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({});
