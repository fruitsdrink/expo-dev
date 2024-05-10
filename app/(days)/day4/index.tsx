import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DayHome } from "@/components";

const desc = `
# Animate Splash Screen using Lottie
## 知识点

- lottie动画的使用

使用lottie扩展名的文件需要配置 \`metro.config.js\`
\`\`\`javascript
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push("lottie");
module.exports = config;  
\`\`\`

- 动画组件的使用

## 第三方包

- lottie-react-native

## Lottie资源
- [lottiefiles](https://lottiefiles.com/)
- [iconscout](https://iconscout.com/free-lottie-animations)
- [json to lottie](https://lottiefiles.com/tools/lottie-to-dotlottie)
`;

export default function Day4Screen() {
  return (
    <DayHome
      title="Animate Splash lottie"
      description={desc}
      buttons={[
        {
          text: "Go to animation",
          link: "/day4/animation",
        },
        {
          text: "Go to Splash",
          link: "/day4/splash",
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({});
