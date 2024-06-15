import { DayHome } from "@/components";

const desc = `
# Hello Animations! - React Native Animations

[youtube](https://youtu.be/eCBv1S9tI8Q?si=AY00DzbjaDXGZ8Ic)

## 技术点
- Animated
- Animated.ValueXY
- Animated.Value
`;

export default function Day42Screen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          text: "Animated.ValueXY",
          link: "/day50/demo/demo1"
        },
        {
          text: "Animated.Value",
          link: "/day50/demo/demo2"
        },
        {
          text: "useNativeDriver",
          link: "/day50/demo/demo3"
        },
        {
          text: "opacity",
          link: "/day50/demo/demo4"
        },
        {
          text: "pan",
          link: "/day50/demo/demo5"
        }
      ]}
    />
  );
}
