import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DayHome } from "@/components";

const desc = `
# EAS Build, Submit, and Update 

[youtube](https://www.youtube.com/live/PdHbBZvPyxI?si=9CESHujCv3nKwdUk)

[eas](https://expo.dev/eas)

## 知识点
- eas build
- eas submit
- eas update

## 注意
- eas只能自动更新javascript代码，不能更新原生代码
- 如果更新了原生代码或权限等，需要重新提交到eas

## [使用方法](https://docs.expo.dev/eas-update/getting-started/)


1. 全局安装 \`eas-cli\` 工具
\`\`\`bash
npm install --global eas-cli
\`\`\`

2. 登录eas
\`\`\`bash
eas login
\`\`\`

3. 检查是否登录成功
\`\`\`bash
eas whoami
\`\`\`

4. 配置项目
\`\`\`bash
expo install expo-updateseas
\`\`\`

\`\`\`bash
eas update:configure
\`\`\`

\`\`\`bash
eas build:configure
\`\`\`

5. Build for iOS Simulators

eas.json
\`\`\`json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "channel": "development",
      "ios": {
        "simulator": true
      }
    },
    "preview": {
      "distribution": "internal",
      "channel": "preview",
      "ios": {
        "simulator": true
      }
    },
    "production": {
      "channel": "production"
    }
  }
}
\`\`\`

6. Build for iOS Devices

\`\`\`
eas build -p ios --profile development
\`\`\`
-p 参数可以是 android ios all

7. 根据控制台提示在模拟器中安装app
8. 运行  \`yarn start\` 命令，启动开发服务器

## 相关文档

- [expo eas](https://docs.expo.dev/eas/)
- [build ios simulator](https://docs.expo.dev/build-reference/simulators/)
`;

export default function index() {
  return <DayHome title="EAS Build & Update" description={desc} />;
}

const styles = StyleSheet.create({});
