import { DayHome } from "@/components";

const desc = `
# Interpolate with ScrollView like a pro (React Native Reanimated)

[youtube](https://youtu.be/SqwpRr7kbnQ?si=TulDQGZ9HIYP_cKf)

## 技术点
- scrollEventThrottle 设置为16，是因为16ms是动画的最佳帧率
`;

export default function Day42Screen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day53/demo"
        }
      ]}
    />
  );
}
