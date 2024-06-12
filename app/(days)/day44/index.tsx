import { DayHome } from "@/components";

const desc = `
# React Native Animated Tabs & Animated Indicator using FlatList

[youtube](https://youtu.be/ZiSN9uik6OY?si=yeCaMp7vSegWhekj)

## 技术点
- learn how to create an animated tabs using React Native FlatList
- learn how to animate a tabs indicator
- learn how to create an animated tabs indicator using Animated API
- learn how to measureLayout and use React Native findNodeHandle
- findNodeHandle的使用
- React.createRef的使用
- React.forwardRef的使用
`;

export default function Day44Screen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day44/demo"
        }
      ]}
    />
  );
}
