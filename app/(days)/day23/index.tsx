import { DayHome } from "@/components";

export default function Day23Screen() {
  const desc = `
  # Reanimated Tutorial: 3.UI thread & Worklet
  [youtube](https://youtu.be/0vUFdFVa1xc?si=j1UxyamMtviNe_a0)
  [youtube](https://youtu.be/XXhBhwoc5gQ?si=ESfgQUmJos-zpF4W)


  ## 技术点

  - UI线程
  - 工作集

  ## 文档资料
  - [Threading Model](https://reactnative.dev/architecture/threading-model)
  - [Worklets](https://docs.swmansion.com/react-native-reanimated/docs/2.x/fundamentals/worklets/)
  - [runOnJS](https://docs.swmansion.com/react-native-reanimated/docs/2.x/api/miscellaneous/runOnJS/)

  `;

  return (
    <DayHome
      title="UI Thread & Worklet"
      description={desc}
      buttons={[
        {
          text: "runOnJS",
          link: "/day23/demo/demo1"
        }
      ]}
    />
  );
}
