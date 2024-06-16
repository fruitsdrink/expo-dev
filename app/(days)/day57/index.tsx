import { DayHome } from "@/components";

const desc = `
# ScrollView from scratch with PanGestureHandler in React Native (Reanimated 3)

[youtube](https://youtu.be/Fd5FWxx7c48?si=UwxXG0J2oRkLFlGQ)

## 技术点
- 手势处理
`;

export default function Day57Screen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day57/demo"
        }
      ]}
    />
  );
}
