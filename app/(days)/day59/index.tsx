import { DayHome } from "@/components";

const desc = `
# Circular Progress Bar Animation in React Native (Reanimated 3) 

[youtube](https://youtu.be/9n2mQJ7TO6Y?si=3Pa2G5Y7wGr6MTh4)

## 技术点
- How to animate props with useAnimatedProps
- How to animate a text on the UI Thread with ReText component
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
