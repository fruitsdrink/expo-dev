import { DayHome } from "@/components";

const desc = `
# scrollToIndex - Dynamic size item scroll inside FlatList

[youtube](https://youtu.be/pTtxhuThMew?si=X35H0kcdOrsPicbn)

## 技术点
- 屏幕尺寸的获取
- 滚动元素到指定位置

## 文档资料
- [FlatList#scrollToIndex](https://reactnative.dev/docs/flatlist)
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
