import { DayHome } from "@/components";

const desc = `
# Interpolate Colors like a pro with React Native Reanimated 3 (Theme Animation)

[youtube](https://youtu.be/U_V9pHnTXjA?si=5k9juunWAwf9W74o)

## 技术点
- 明暗主题动画
- 插值颜色
`;

export default function Day54Screen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day54/demo"
        }
      ]}
    />
  );
}
