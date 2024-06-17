import { DayHome } from "@/components";

const desc = `
# Swipe to delete Animation in React Native with Reanimated 3

[youtube](https://youtu.be/AVS_2nzt8Do?si=JMVjLcnBjMVLz4gm)

## 技术点
- 使用 Reanimated 3 实现滑动删除动画
- 解决平移手势与滚动手势冲突的问题(simultaneousWithExternalGesture)
`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day60/demo"
        }
      ]}
    />
  );
}
