import { DayHome } from "@/components";

const desc = `
# Color Picker Animation with React Native Reanimated 3

[youtube](https://youtu.be/XH35ahDm3as?si=jg5IraXVPBAnfPXB)

## 技术点
- Reanimated Worklets
- interpolateColor 
- PanGestureHandler
- TapGestureHandler
- useAnimatedGestureHandler

## package
- expo-linear-gradient
`;

export default function Day58Screen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day58/demo"
        }
      ]}
    />
  );
}
