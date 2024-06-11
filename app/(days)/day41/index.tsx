import { DayHome } from "@/components";

const desc = `
# Advanced React Native Parallax Carousel with FlatList and Animated API

[youtube](https://youtu.be/fSuYM86JXFo?si=2ODk8bfZ4H4rOINN)

## 技术点
- How to create and animated a FlatList Parallax Carousel
- How to make image inside the FlatList "move" using translateX
- How to style the FlatList and apply parallax effect

## 参考
`;

export default function Day41Screen() {
  return (
    <DayHome
      title="视差轮播"
      description={desc}
      buttons={[
        {
          link: "/day41/demo"
        }
      ]}
    />
  );
}
