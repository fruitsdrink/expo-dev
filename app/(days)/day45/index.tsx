import { DayHome } from "@/components";

const desc = `
# How to Animate words in a sentence in React Native using Animated.stagger

[youtube](https://youtu.be/mwZPCA6Du5A?si=dPltgDUGxuLH8GCJ)

## 技术点
- expo-constants
`;

export default function Day45Screen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day45/demo"
        }
      ]}
    />
  );
}
