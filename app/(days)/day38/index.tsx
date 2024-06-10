import { DayHome } from "@/components";

const desc = `
# Medium mobile article - Sticky footer - React Native with Animated API

[youtube](https://youtu.be/4Pw4du1IrDs?si=6sgOMv4as4tuK6am)

## 技术点
- ScrollView
- scroll sticky
- 粘性低栏
- expo-constants组件的使用

## 文档资料

`;

export default function Day38Screen() {
  return (
    <DayHome
      title="Sticky footer "
      description={desc}
      buttons={[
        {
          link: "/day38/demo"
        }
      ]}
    />
  );
}
