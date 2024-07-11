import { DayHome } from "@/components";

const desc = `
# Animated Split Button in React Native (Reanimated) 

[youtube](https://youtu.be/GxkzFYI6eqI?si=kN4moHuGVOmXMuck)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day109/demo"
        }
      ]}
    />
  );
}
