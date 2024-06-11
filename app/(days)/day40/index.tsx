import { DayHome } from "@/components";

const desc = `
# React Native Countdown Timer Animation with FlatList and Animated API

[youtube](https://youtu.be/z9l5WXPKCpA?si=KZAwcOv9k2RjWAWw)

## 技术点
- How to create and animate a FlatList items for timer picker
- How to create a custom timer picker
- How to get the active slide index and change the duration of the animation
- How to use Animated API - Animated.parallel
- How to use Animated.API - Animated.sequence
- How to update a Text  based on animated value using TextInput and setNativeProps

## 参考
- [dribbble](https://dribbble.com/shots/2343572-Countdown-timer/)
`;

export default function Day40Screen() {
  return (
    <DayHome
      title="Countdown Timer Animation"
      description={desc}
      buttons={[
        {
          link: "/day40/demo"
        }
      ]}
    />
  );
}
