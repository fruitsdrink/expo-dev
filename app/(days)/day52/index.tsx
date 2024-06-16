import { DayHome } from "@/components";

const desc = `
# The basics of PanGestureHandler with React Native Reanimated 2 

[youtube](https://youtu.be/4HUreYYoE6U?si=dQISq8VEgEcaoN34)

## 技术点
- Readminated 手势处理
`;

export default function Day42Screen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          text: "Demo",
          link: "/day52/demo/demo1"
        },
        {
          text: "Demo2 解决废弃警告",
          link: "/day52/demo/demo2"
        }
      ]}
    />
  );
}
