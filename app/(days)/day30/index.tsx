import { DayHome } from "@/components";

const desc = `
# scrollToIndex - Dynamic size item scroll inside FlatList

[youtube](https://youtu.be/pTtxhuThMew?si=X35H0kcdOrsPicbn)

## 技术点
- 屏幕尺寸的获取
- FlatList滚动元素到指定位置
- moti 组件的使用

## package

- [moti](https://moti.fyi/installation)

## 文档资料
- [FlatList#scrollToIndex](https://reactnative.dev/docs/flatlist)
- [moti](https://moti.fyi)
`;

export default function Day27Screen() {
  return (
    <DayHome
      title="scrollToIndex"
      description={desc}
      buttons={[
        {
          link: "/day30/demo"
        }
      ]}
    />
  );
}
