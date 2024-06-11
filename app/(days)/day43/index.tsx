import { DayHome } from "@/components";

const desc = `
# Animated Progress Bar Indicator in React Native using Animated API and onLayout

[youtube](https://youtu.be/J95MC2Koymc?si=1dWNPYo4yRPmfIgx)

## 技术点
- How to create a reusable component in React Native
- How to animate the progress indicator bar
- How to calculate the position of the bar from current progress.
- How to use onLayout to get the size of the progress bar indicator
- How to use reactive type of animation in React Native using Animated API
`;

export default function Day43Screen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day43/demo"
        }
      ]}
    />
  );
}
