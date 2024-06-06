import { DayHome } from "@/components";

export default function Day21Screen() {
  const desc = `
  # Reanimated Tutorial: 1.Animation 4 steps
  [youtube](https://youtu.be/NRHoyKgb42E?si=dIlOuAHnMPtPHaLV)

  \`\`\`bash
  npx expo install react-native-reanimated
  \`\`\`
  ## 技术点
  - 动画基本使用
    1. 使用 \`useSharedValue\` 定义动画值
    2. 使用 \`useAnimatedStyle\` 定于动画样式
    3. 使用 \`withTiming\` 改变动画值
    4 .使用 \`Animated.View\` 包裹动画组件，并应用动画样式
  `;

  return (
    <DayHome
      title="Animation 4 steps"
      description={desc}
      buttons={[
        {
          text: "Demo1",
          link: "/day21/demo/demo1"
        },
        {
          text: "Demo2",
          link: "/day21/demo/demo2"
        }
      ]}
    />
  );
}
