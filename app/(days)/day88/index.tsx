import { DayHome } from "@/components";

const desc = `
# Custom Tab Navigation in Expo Router | React Native Tutorial  

- [youtube part1](https://youtu.be/K6OJP0s5VDQ?si=P50Zd3Ov96HFF3B3)
- [youtube part2](https://youtu.be/tLl_h6-UIC4?si=fZ77nI4BpHnJWnDu)

## package
- @react-navigation/bottom-tabs

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day88/demo"
        }
      ]}
    />
  );
}
