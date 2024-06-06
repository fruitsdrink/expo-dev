import { DayHome } from "@/components";

export default function Day22Screen() {
  const desc = `
  # Reanimated Tutorial: 2.Animated Component
  [youtube](https://youtu.be/gxH_6PKLnxM?si=hVEJC_R58P4eqQVf)
  [youtube](https://youtu.be/ZJqlcH13BhA?si=KbFqa-FiTh_kKcBL)


  ## 技术点

  - useAnimatedStyle
  - 内链样式

  ## 动画组件实现了3个属性
  - AnimatedStyleProps
  - LayoutProps
  - SharedTransitionProps

  ### 内置动画组件
  - Animated.FlatList
  - Animated.Image
  - Animaged.View
  - Animated.ScrollView
  - Animated.Text
  `;

  return (
    <DayHome
      title="Animated Component"
      description={desc}
      buttons={[
        {
          text: "useAnimatedStyle",
          link: "/day22/demo/demo1"
        },
        {
          text: "内链样式",
          link: "/day22/demo/demo2"
        }
      ]}
    />
  );
}
