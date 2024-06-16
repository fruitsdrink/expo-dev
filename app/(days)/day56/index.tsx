import { DayHome } from "@/components";

const desc = `
# Animate on DoubleTap like Instagram (React Native Reanimated 2) 

[youtube](https://youtu.be/nbEmo0zLJjw?si=w_Pq29r4CeuMujmM

## 技术点
- 单击和双击的区分
- 动画
`;

export default function Day42Screen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day56/demo"
        }
      ]}
    />
  );
}
