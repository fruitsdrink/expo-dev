import { DayHome } from "@/components";

const desc = `
# Expo Router Drawer Navigation with Custom Menu

[youtube](https://youtu.be/3p9LtOUg5fw?si=jKZfuP-lkoynmgda)

## 技术点
- 需要使用手势的页面要先导入 \`import 'react-native-gesture-handler'\`
`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day84/demo"
        }
      ]}
    />
  );
}
