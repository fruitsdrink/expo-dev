import { DayHome } from "@/components";

const desc = `
# Circular Progress Bar Animation in React Native (Reanimated 3) 

[youtube](https://youtu.be/9n2mQJ7TO6Y?si=3Pa2G5Y7wGr6MTh4)

## 技术点
- How to animate props with useAnimatedProps
- How to animate a text on the UI Thread with ReText component

## package
- react-native-redash
- react-native-svg
- react-native-reanimated
- react-native-animateable-text
- react-native-redash

## 相关文档资料
- [解决文本组件不能显示进度值](https://github.com/axelra-ag/react-native-animateable-text#omg-why-would-you-build-this)
`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day59/demo"
        }
      ]}
    />
  );
}
