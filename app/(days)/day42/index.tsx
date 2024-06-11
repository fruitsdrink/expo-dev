import { DayHome } from "@/components";

const desc = `
# Advanced FlatList Carousel Animation in React Native using Animated.API

[youtube](https://youtu.be/YE7c6ch2msY?si=kV3GmdC-D4kNk28A)

## 技术点
- How to create and animated a FlatList carousel pagination
- How to animate a color or backgroundColor in React Native
- How to use Animated.modulo and Math for animations
- Animated - extrapolate属性的使用
`;

export default function Day42Screen() {
  return (
    <DayHome
      title="FlatList Carousel Animation"
      description={desc}
      buttons={[
        {
          link: "/day42/demo"
        }
      ]}
    />
  );
}
