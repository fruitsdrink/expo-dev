import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DayHome } from "@/components";

const desc = `
# OS Voice Memos app

[youbube](https://www.youtube.com/live/1UmepETPGJI?si=6FI-OdPoAyQrR1ov)

## 知识点
- 音频录音
- 重复播放音频
- 路由按钮动画效果

## 第三方包
- [expo-av](https://docs.expo.dev/versions/latest/sdk/audio/)

安装脚本
\`\`\`bash
npx expo install expo-av
\`\`\`

`;
export default function Day7Screen() {
  return (
    <DayHome
      title="IOS Voice Memos"
      description={desc}
      buttons={[{ link: "/day7/voice-memos" }]}
    />
  );
}

const styles = StyleSheet.create({});
