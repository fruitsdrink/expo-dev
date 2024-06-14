import { DayHome } from "@/components";

const desc = `
# 根据屏幕方向调整尺寸

[youtube](https://youtu.be/dxtT-wN6psg?si=5fA6NZ5gcJxlHxQn)

## 技术点
- Dimensions
- useWindowDimensions
- 改变屏幕方向

修改app.json 将 \`"orientation": "portrait",\`改为 \`"orientation": "default",\`

## package
- expo-screen-orientation
`;

export default function Day46Screen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day46/demo"
        }
      ]}
    />
  );
}
