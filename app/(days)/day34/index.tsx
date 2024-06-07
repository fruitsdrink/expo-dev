import { DayHome } from "@/components";

const desc = `
# Beautiful React Native gallery view - Synced FlatLists - Animated API - Pexels API
画廊视图
[youtube](https://youtu.be/gjC2oUJhePE?si=oSNa4bOlaB1PtrTW)

## 技术点
- 两个FlatList协同
- Animated

## package

- [moti](https://moti.fyi/installation)

## 文档资料
`;

export default function Day34Screen() {
  return (
    <DayHome
      title="画廊视图"
      description={desc}
      buttons={[
        {
          link: "/day34/demo"
        }
      ]}
    />
  );
}
