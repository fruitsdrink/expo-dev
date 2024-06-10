import { DayHome } from "@/components";

const desc = `
# Advanced 3D Carousel Animation in React Native using FlatList & Animated API

[youtube](https://youtu.be/k2ax0t4dYAY?si=JDmPTTcmqU5I0HKd)

## 技术点
- FlatList
- Animated

## 文档资料

`;

export default function Day37Screen() {
  return (
    <DayHome
      title="3D Carousel Animation"
      description={desc}
      buttons={[
        {
          link: "/day37/demo"
        }
      ]}
    />
  );
}
