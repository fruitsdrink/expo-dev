import { DayHome } from "@/components";

const desc = `
# React Native Shared Element Transition React Navigation V5 - Episode 4

[youtube](https://youtu.be/fiAdt9-wNJo?si=2ebNyuqMdyxNR-0C)

## package
- [react-native-masonry-layout](https://github.com/manyuanrong/react-native-masonry-layout/blob/master/README-zh.md)
## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day126/demo"
        }
      ]}
    />
  );
}
