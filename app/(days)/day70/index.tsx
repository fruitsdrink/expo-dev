import { DayHome } from "@/components";

const desc = `
# Custom Segmented Control in React Native (Reanimated)

[youtube](https://youtu.be/RTYNKDODSfw?si=Qriwx3MOji95T3iT)

## 技术点
- 字体的使用
- 动画
`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day70/demo"
        }
      ]}
    />
  );
}
