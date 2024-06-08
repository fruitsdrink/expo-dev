import { DayHome } from "@/components";

const desc = `
# React Native Scroll Item animation effect - FlatList and Animated API
画廊视图
[youtube](https://youtu.be/F8x-dyIsrJ8?si=YxbalmBmuguaxijl)

## 技术点
- FlatList
- Animated
- 模糊背景图片

## 文档资料
`;

export default function Day35Screen() {
  return (
    <DayHome
      title="FlatList滚动动画"
      description={desc}
      buttons={[
        {
          link: "/day35/demo"
        }
      ]}
    />
  );
}
