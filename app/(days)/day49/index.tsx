import { DayHome } from "@/components";

const desc = `
# Tarot wheel animation in React Native using Reanimated

[youtube](https://www.youtube.com/live/Y4WllzY7xj0?si=ZL07aIf5D3oGVht8)

## 技术点
- Reanimated
- 手势

## 网站
- https://www.freepik.com
`;

export default function Day49Screen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day49/demo"
        }
      ]}
    />
  );
}
