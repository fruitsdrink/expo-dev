import { DayHome } from "@/components";

const desc = `
# The basics of PinchGestureHandler with React Native Reanimated 3

[youtube](https://youtu.be/R7vyLItMQJw?si=cSV3l5Dl4dTdvkC0)

## 技术点
- 收拾缩放图片
- 动画
`;

export default function Day42Screen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          text: "react-native-gesture-handler 1 写法",
          link: "/day55/demo/demo1"
        },
        {
          text: "react-native-gesture-handler 2 写法",
          link: "/day55/demo/demo2"
        }
      ]}
    />
  );
}
