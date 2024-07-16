import { DayHome } from "@/components";

const desc = `
# read pdf 

[youtube](https://youtu.be/rlKAQZhenlQ?si=G0js9h4B5ONN8-o6)

## package
- expo-document-picker
- https://github.com/wonday/react-native-pdf

\`\`\`bash
npx expo install react-native-pdf react-native-blob-util @config-plugins/react-native-pdf @config-plugins/react-native-blob-util
\`\`\`

After installing this npm package, add the config plugin to the plugins array of your app.json or app.config.js:

\`\`\`
{
  "plugins": [
    "@config-plugins/react-native-blob-util",
    "@config-plugins/react-native-pdf"
  ]
}
\`\`\`
## 技术点
- 读取并显示pdf

## 相关文档
- [expo 安装pdf](https://github.com/expo/config-plugins/tree/main/packages/react-native-pdf)
`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day116/demo"
        }
      ]}
    />
  );
}
