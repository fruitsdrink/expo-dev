import { DayHome } from "@/components";

const desc = `
# Custom Tab Navigation in Expo Router | React Native Tutorial  

[youtube](https://youtu.be/K6OJP0s5VDQ?si=P50Zd3Ov96HFF3B3)
[youtube](https://youtu.be/K6OJP0s5VDQ?si=P50Zd3Ov96HFF3B3)

## 技术点

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
