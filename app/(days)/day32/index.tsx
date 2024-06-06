import { DayHome } from "@/components";

const desc = `
# Loading Animation - React Native Moti & Reanimated v2

[youtube](https://youtu.be/e5_auZoh85w?si=rmZydLxdxBhgYTF6)

## 技术点
- Moti 循环
- Moti 反向动画
- Animated
- css 发光效果

## package

- [moti](https://moti.fyi/installation)

## 文档资料
`;

export default function Day31Screen() {
  return (
    <DayHome
      title="Loading Animation"
      description={desc}
      buttons={[
        {
          link: "/day32/demo"
        }
      ]}
    />
  );
}
