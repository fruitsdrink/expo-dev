import { DayHome } from "@/components";

const desc = `
# Animated Stacked Cards - Exploring the interpolate function (React Native Reanimated) 

[youtube](https://youtu.be/8_hvNoZJsc8?si=AZFTowqBwpBN5v6J)

## package
- react-native-anchor-point
## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day120/demo"
        }
      ]}
    />
  );
}
